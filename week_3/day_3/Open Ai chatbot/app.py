# app.py
from flask import Flask, request, jsonify, render_template_string
from dotenv import load_dotenv, find_dotenv
from groq import Groq
import os, re, requests
from difflib import SequenceMatcher

load_dotenv(find_dotenv(usecwd=True))
app = Flask(__name__)
# ---- UTF-8 JSON (fix: "'ascii' codec can't encode character ...")
app.config['JSON_AS_ASCII'] = False
app.config['JSONIFY_MIMETYPE'] = "application/json; charset=utf-8"

# ---- Flags
DEBUG_UI = os.getenv("DEBUG_UI", "false").lower() == "true"   # False = masque les [debug:*] en prod
ENABLE_GENERATION = os.getenv("ENABLE_GENERATION", "false").lower() == "true"

# ---- LLM (Groq)
MODEL = os.getenv("MODEL", "llama-3.1-8b-instant")
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ---- Pexels
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
PEXELS_IMG_URL = "https://api.pexels.com/v1/search"
PEXELS_VIDEO_URL = "https://api.pexels.com/videos/search"

# ---- (optionnel) génération locale
SD_WEBUI_URL = os.getenv("SD_WEBUI_URL", "http://127.0.0.1:7860")
SVD_API_URL = os.getenv("SVD_API_URL", "http://127.0.0.1:8188/svd")

# ---------------- Helpers debug ----------------
def debug_tag(label: str) -> str:
    return f" [debug:{label}]" if DEBUG_UI else ""

# ---------------- Lang detection FR/EN/AR ----------------
ACCENT_RE = re.compile(r"[éèêëàâäîïôöùûüç]")
ARABIC_RE = re.compile(r"[\u0600-\u06FF]")
FR_STOP = {"le","la","les","un","une","des","de","du","et","est","sont","je","tu","il","elle","nous","vous","ils","bonjour","salut","merci","svp"}
EN_STOP = {"the","a","an","and","is","are","am","i","you","he","she","we","they","hello","hi","thanks","please"}
DARIJA_HINTS = {"bghit","tswira","sora","swar","dyal","3tini","3tayni","zidni","izidni","kthar","wahda","wa7da","vidyo","video","lqamar","alqamar","qamar"}

def detect_lang(text: str) -> str:
    t = text.lower()
    if ARABIC_RE.search(t): return "ar"
    if any(w in t for w in DARIJA_HINTS): return "ar"
    # inclure lettres accentuées
    toks = re.findall(r"[A-Za-zÀ-ÖØ-öø-ÿ']+", t)
    fr = sum(tok in FR_STOP for tok in toks)
    en = sum(tok in EN_STOP for tok in toks)
    if ACCENT_RE.search(t) or fr > en: return "fr"
    return "en"

# ---------------- Fuzzy helpers ----------------
def similar(a: str, b: str) -> float: return SequenceMatcher(None, a, b).ratio()
def looks_like(token: str, targets: list[str], th: float = 0.72) -> bool:
    token = token.lower(); return any(similar(token, t) >= th for t in targets)
def strip_leading_symbols(t: str) -> str:
    return re.sub(r"^[^a-z0-9\u0600-\u06FF]+", "", t.lower().strip())

# ---------------- Query cleaners ----------------
STOP_PREFIXES = (
    "of ", "de ", "du ", "des ", "la ", "le ", "les ",
    "dyal ", "dial ", "ديال ", "ل "
)
def clean_after_marker(text: str) -> str:
    t = text.strip()
    tl = t.lower()
    for p in STOP_PREFIXES:
        if tl.startswith(p):
            return t[len(p):].strip()
    return t

# ---------------- Intents recherche ----------------
IMG_PATTERNS = [
    r"\bphoto(?:s)? de (.+)", r"\bimage(?:s)? de (.+)",
    r"\bmontre[ -]?moi (?:une|des)? (?:photo|image)s? de (.+)",
    r"\bphoto(?:s)? of (.+)", r"\bimage(?:s)? of (.+)", r"\bpicture(?:s)? of (.+)",
    r"\bshow me (?:a|an|some)? (?:photo|image|picture)s? of (.+)",
    r"\b(bghit|baghi)\s+(?:tswira|sora)\s+dyal\s+(.+)",
    r"\b3tini\s+(?:tswira|sora)\s+dyal\s+(.+)",
    r"\b3tayni\s+(?:tswira|sora)\s+dyal\s+(.+)",
    r"\b(?:tswira|sora)\s+dyal\s+(.+)",
    r"(?:صورة|تصويرة)\s*(?:ديال|ل)?\s*(.+)"
]
VID_PATTERNS = [
    r"\bvidéo(?:s)? de (.+)", r"\bvideo(?:s)? de (.+)",
    r"\bmontre[ -]?moi (?:une|des)? vidéo(?:s)? de (.+)",
    r"\bvideo(?:s)? of (.+)", r"\bshow me (?:a|an|some)? video(?:s)? of (.+)",
    r"\b(bghit|baghi)\s+(?:video|vidyo)\s+dyal\s+(.+)",
    r"\b3tini\s+(?:video|vidyo)\s+dyal\s+(.+)",
    r"\b3tayni\s+(?:video|vidyo)\s+dyal\s+(.+)",
    r"\b(?:video|vidyo)\s+dyal\s+(.+)",
    r"(?:فيديو)\s*(?:ديال|ل)?\s*(.+)"
]
MORE_PATTERNS = [r"\bizidni\b", r"\bzidni\b", r"\bkthar\b", r"\bmore\b", r"\bencore\b"]

def says_more(txt: str) -> bool:
    t = strip_leading_symbols(txt); return any(re.search(p, t) for p in MORE_PATTERNS)

def extract_media_query(txt: str):
    t = strip_leading_symbols(txt)

    for pat in VID_PATTERNS:
        m = re.search(pat, t)
        if m:
            q = m.group(m.lastindex) if m.lastindex else None
            return "video", clean_after_marker((q or t).strip(" .!?"))

    for pat in IMG_PATTERNS:
        m = re.search(pat, t)
        if m:
            q = m.group(m.lastindex) if m.lastindex else None
            return "image", clean_after_marker((q or t).strip(" .!?"))

    tokens = re.findall(r"[A-Za-zÀ-ÖØ-öø-ÿ\u0600-\u06FF']+", t)
    if tokens:
        first = tokens[0]
        if looks_like(first, ["photo","image","picture","photos","images","pictures","tswira","sora","تصويرة","صورة"]):
            rest = clean_after_marker(t.split(first,1)[1].strip(" .!:;,-"))
            return "image", rest or t
        if looks_like(first, ["vidéo","video","videos","vidéos","vidyo","فيديو"]):
            rest = clean_after_marker(t.split(first,1)[1].strip(" .!:;,-"))
            return "video", rest or t

    if set(tokens) & {"bghit","baghi","veux","want","3tini","3tayni","show","montre"}:
        for i, tok in enumerate(tokens):
            if looks_like(tok, ["photo","image","picture","vidéo","video","videos","pictures","tswira","sora","vidyo","فيديو","صورة","تصويرة"]):
                query = clean_after_marker(" ".join(tokens[i+1:]))
                if query:
                    kind = "video" if ("vid" in tok or tok == "فيديو") else "image"
                    return kind, query

    return None, None

# ---------------- Intents génération ----------------
def is_generate_image(text: str) -> str | None:
    t = strip_leading_symbols(text)
    keys = ["génère une image de","genere une image de","génère image de","genere image de",
            "generate an image of","create an image of","make an image of"]
    for k in keys:
        if k in t: return t.split(k,1)[1].strip(" .!?")
    m = re.search(r"^i\s*want\s+(?:an?\s+)?(.+?)\s+image(?:\s|$)", t)
    if m: return m.group(1).strip(" .!?")
    m = re.search(r"^(?:please\s+)?(?:generate|generates|create|creates|make|makes|produce|produces)\s+(?:an?\s+)?(.+?)\s+image(?:\s|$)", t)
    if m: return m.group(1).strip(" .!?")
    if t.startswith(("dessine ", "imagine ")): return t.split(" ",1)[1].strip(" .!?")
    return None

def is_generate_video(text: str) -> str | None:
    t = strip_leading_symbols(text)
    keys = ["génère une vidéo de","genere une video de","génère vidéo de","genere video de",
            "generate a video of","create a video of","make a video of"]
    for k in keys:
        if k in t: return t.split(k,1)[1].strip(" .!?")
    m = re.search(r"^i\s*want\s+(.+?)\s+video(?:\s|$)", t)
    if m: return m.group(1).strip(" .!?")
    m = re.search(r"^(?:please\s+)?(?:generate|generates|create|creates|make|makes|produce|produces)\s+(.+?)\s+video(?:\s|$)", t)
    if m: return m.group(1).strip(" .!?")
    return None

# ---------------- Requête Pexels helpers ----------------
def _refine_image_query(q: str, lang: str) -> str:
    t = q.lower().strip()
    if any(w in t for w in ["northern lights","aurora","aurore","الشفق"]): t += " aurora borealis"
    if ("carnival" in t or "carnaval" in t) and "sunset" in t: t += " ferris wheel lights"
    if any(w in t for w in ["moon","lune","alqamar","lqamar","qamar","قمر","القمر"]):
        t += " moon night sky"
    return t

def _fallback_keywords(q: str) -> str:
    q = re.sub(r"\b(of|the|a|an|de|du|des|la|le|les|l'|d')\b", " ", q.lower())
    return re.sub(r"\s+", " ", q).strip()

def pexels_search_images(query: str, n: int = 1):
    if not PEXELS_API_KEY:
        app.logger.warning("PEXELS_API_KEY manquante")
        return []
    lang = detect_lang(query); q = _refine_image_query(query, lang)
    headers = {"Authorization": PEXELS_API_KEY}

    def call(params):
        try:
            r = requests.get(PEXELS_IMG_URL, headers=headers, params=params, timeout=12)
            if r.status_code != 200: return []
            data = r.json(); out=[]
            for p in data.get("photos", []):
                out.append({
                    "type":"image",
                    "url": p["src"].get("large") or p["src"].get("original"),
                    "thumb": p["src"].get("medium") or p["src"].get("tiny"),
                    "credit": p.get("photographer"),
                    "credit_url": p.get("photographer_url"),
                    "alt": p.get("alt") or f"Photo: {query}",
                })
            return out
        except Exception:
            return []

    params1 = {"query": q, "per_page": max(1,n), "orientation": "landscape", "size": "large",
               "page": 1, "locale": "fr-FR" if lang=="fr" else ("ar-SA" if lang=="ar" else "en-US")}
    res = call(params1)
    if res: return res

    params2 = {"query": q, "per_page": max(1,n), "page": 1,
               "locale": "fr-FR" if lang=="fr" else ("ar-SA" if lang=="ar" else "en-US")}
    res = call(params2)
    if res: return res

    q2 = _fallback_keywords(q)
    params3 = {"query": q2 or "moon night sky", "per_page": max(1,n), "page": 1}
    return call(params3)

def pexels_search_videos(query: str, n: int = 1):
    if not PEXELS_API_KEY:
        app.logger.warning("PEXELS_API_KEY manquante")
        return []
    lang = detect_lang(query); q = query.lower().strip()
    headers = {"Authorization": PEXELS_API_KEY}

    try:
        r = requests.get(PEXELS_VIDEO_URL, headers=headers,
                         params={"query": q, "per_page": max(1,n), "page": 1,
                                 "locale": "fr-FR" if lang=="fr" else ("ar-SA" if lang=="ar" else "en-US")},
                         timeout=12)
        if r.status_code != 200: return []
        data = r.json(); out=[]
        for v in data.get("videos", []):
            files = v.get("video_files", [])
            chosen = None
            for f in files:
                if f.get("file_type")=="video/mp4" and f.get("width")==1280 and f.get("height")==720:
                    chosen = f; break
            if not chosen and files:
                chosen = max(files, key=lambda f: (f.get("width",0)*f.get("height",0)))
            if not chosen: continue
            out.append({
                "type":"video",
                "url": chosen.get("link"),
                "thumb": v.get("image"),
                "width": chosen.get("width"),
                "height": chosen.get("height"),
            })
        return out
    except Exception:
        return []

# ---------------- Génération locale (si activée) ----------------
def sd_txt2img(prompt: str, steps: int = 25, width: int = 768, height: int = 768):
    url = SD_WEBUI_URL.rstrip("/") + "/sdapi/v1/txt2img"
    r = requests.post(url, json={"prompt": prompt, "steps": steps, "width": width, "height": height}, timeout=120)
    r.raise_for_status()
    b64 = r.json()["images"][0]
    return "data:image/png;base64," + b64

def svd_img2vid(image_b64: str, frames: int = 24, motion_scale: float = 1.0):
    r = requests.post(SVD_API_URL, json={"image": image_b64, "frames": frames, "motion_scale": motion_scale}, timeout=300)
    r.raise_for_status()
    js = r.json()
    if js.get("video_url"): return js["video_url"]
    if js.get("video_b64"): return "data:video/mp4;base64," + js["video_b64"]
    raise RuntimeError("Réponse SVD invalide")

# ---------------- UI ----------------
HTML = r"""
<!doctype html>
<meta charset="utf-8">
<title>My Chatbot (Pexels • Darija • Mic multi-lang)</title>
<style>
:root{ --card:#ffffff; --text:#0f172a; --muted:#475569; --bg:#eef2ff; --border:#e5e7eb; --primary:#4f46e5; --primary-2:#4338ca; --chip:#eef2ff; }
body.dark{ --card:#0b1220; --text:#e5e7eb; --muted:#94a3b8; --bg:#0a0f1a; --border:#1f2937; --primary:#6366f1; --primary-2:#4f46e5; --chip:#111827; }
html,body{height:100%}
body{ margin:0; background:var(--bg); color:var(--text); font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Noto Sans",sans-serif; display:flex; align-items:center; justify-content:center; padding:24px; }
.card{ width:min(92vw,880px); background:var(--card); border:1px solid var(--border); border-radius:16px; box-shadow:0 10px 30px rgba(2,6,23,.08); overflow:hidden; }
.header{ display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--border); }
.brand{ display:flex; gap:12px; align-items:center; }
.avatar{ width:40px;height:40px;border-radius:50%; background:var(--primary); color:#fff; display:grid; place-items:center; font-weight:700; }
.titles .title{ font-size:18px; font-weight:700 } .titles .subtitle{ font-size:13px; color:var(--muted) }
.actions{ display:flex; gap:8px }
.btn{ border:1px solid var(--border); background:transparent; color:var(--text); padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:600; }
.btn.primary{ border:none; background:var(--primary); color:#fff } .btn.primary:hover{ background:var(--primary-2) } .btn:active{ transform:translateY(1px) }
#log{ padding:14px; min-height:320px; max-height:58vh; overflow:auto; white-space:pre-wrap; background:color-mix(in srgb, var(--card) 90%, #000 0%); }
.composer{ display:flex; gap:10px; padding:12px; border-top:1px solid var(--border); align-items:center; }
.composer input{ flex:1; padding:12px 12px; font-size:16px; border-radius:10px; border:1px solid var(--border); outline:none; background:var(--card); color:var(--text); }
.composer input:focus{ border-color:var(--primary); box-shadow:0 0 0 3px color-mix(in srgb, var(--primary) 22%, transparent); }
.attach{ display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:12px; border:1px solid var(--border); background:transparent; cursor:pointer; font-size:24px; line-height:1; }
.chip{ display:inline-flex; align-items:center; gap:6px; padding:6px 10px; margin:6px 0 0 12px; background:var(--chip); border:1px solid var(--border); border-radius:999px; font-size:12px; color:var(--muted); }
.dim{ opacity:.6 }
.media-grid{ display:grid; grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); gap:10px; padding:12px; }
.media-card{ border:1px solid var(--border); border-radius:12px; overflow:hidden; background:var(--card); }
.media-card img, .media-card video{ width:100%; display:block; }
.media-card a{ text-decoration:none; color:var(--text); display:block; padding:8px; font-size:12px;}
.mic{ width:44px;height:44px;border-radius:12px;border:1px solid var(--border);background:transparent;cursor:pointer;font-size:18px; margin-right:6px;}
.mic.rec{ background:var(--primary); color:#fff; }
.select{ border:1px solid var(--border); border-radius:10px; padding:8px; background:var(--card); color:var(--text); margin-right:6px; }
</style>

<div class="card">
  <div class="header">
    <div class="brand">
      <div class="avatar">AI</div>
      <div class="titles">
        <div class="title">My Chatbot</div>
        <div class="subtitle">Pexels • Darija • Micro multi-langues</div>
      </div>
    </div>
    <div class="actions">
      <button id="clear" class="btn">Clear</button>
      <button id="theme" class="btn">Theme</button>
    </div>
  </div>

  <div id="log"></div>

  <form id="f" class="composer">
    <select id="srLang" class="select" title="Langue dictée">
      <option value="ar-MA">ar-MA (العربية/دارجة)</option>
      <option value="fr-FR">fr-FR (Français)</option>
      <option value="en-US">en-US (English)</option>
    </select>
    <button id="mic" type="button" class="mic" title="Dictée">🎤</button>
    <input id="msg" placeholder="Parle… puis Send" autocomplete="off" />
    <label class="attach" title="Ajouter un fichier"> + <input id="file" type="file" hidden /> </label>
    <button class="btn primary" type="submit" id="sendBtn">Send</button>
  </form>
  <div id="fileChip" class="chip" style="display:none;margin-left:12px;margin-bottom:12px">
    Fichier prêt : <span id="fileName"></span>
  </div>
</div>

<script>
const log = document.getElementById('log');
const f = document.getElementById('f');
const msg = document.getElementById('msg');
const btnTheme = document.getElementById('theme');
const btnClear = document.getElementById('clear');
const fileInput = document.getElementById('file');
const chip = document.getElementById('fileChip');
const fileNameSpan = document.getElementById('fileName');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('mic');
const srLang = document.getElementById('srLang');

let lastQuery = localStorage.getItem('lastMediaQuery') || "";
let lastKind  = localStorage.getItem('lastMediaKind')  || "";

function saveLog(){ localStorage.setItem('chatLog', log.innerHTML); }
function restore(){
  const saved = localStorage.getItem('chatLog'); if(saved) log.innerHTML = saved;
  const theme = localStorage.getItem('theme'); if(theme === 'dark') document.body.classList.add('dark');
  const savedLang = localStorage.getItem('srLang') || 'ar-MA'; srLang.value = savedLang; updatePlaceholder(savedLang);
}
restore();

srLang.addEventListener('change', ()=>{ localStorage.setItem('srLang', srLang.value); updatePlaceholder(srLang.value); });
function updatePlaceholder(lang){ msg.placeholder = lang.startsWith('ar') ? "تكلم… ثم Send" : (lang.startsWith('fr') ? "Parle… puis Send" : "Speak… then Send"); }
btnTheme.addEventListener('click', ()=>{ document.body.classList.toggle('dark'); localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light'); });
btnClear.addEventListener('click', ()=>{ log.innerHTML=''; chip.style.display='none'; localStorage.removeItem('chatLog'); localStorage.removeItem('lastMediaQuery'); localStorage.removeItem('lastMediaKind'); });
fileInput.addEventListener('change', ()=>{ if(fileInput.files && fileInput.files[0]){ fileNameSpan.textContent=fileInput.files[0].name; chip.style.display='inline-flex'; } else { chip.style.display='none'; } });

function append(text){ const d=document.createElement('div'); d.textContent = text; log.appendChild(d); }
function appendUser(t){ append("\\n🧑‍💻: " + t); }
function appendAssistant(t){ append("🤖: " + t); }
function appendMedia(media){
  if(!media || !media.length) return;
  const grid=document.createElement('div'); grid.className='media-grid';
  media.forEach(m=>{
    const card=document.createElement('div'); card.className='media-card';
    if(m.type==='image'){ const img=document.createElement('img'); img.src=m.thumb||m.url; img.alt=m.alt||'image'; card.appendChild(img);
      const a=document.createElement('a'); a.href=m.url; a.target='_blank'; a.textContent = m.credit ? `Crédit: ${m.credit}` : 'Ouvrir l’image'; card.appendChild(a);
    } else if(m.type==='video'){ const vid=document.createElement('video'); vid.src=m.url; vid.controls=true; card.appendChild(vid);
      const a=document.createElement('a'); a.href=m.url; a.target='_blank'; a.textContent='Ouvrir la vidéo'; card.appendChild(a); }
    grid.appendChild(card);
  });
  log.appendChild(grid);
}

function isMorePhrase(t){ t=t.toLowerCase(); return ["izidni","zidni","kthar","more","encore"].some(w=> t.includes(w)); }

f.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const text = msg.value.trim(); if(!text) return;

  const payload = { message:text };
  if(isMorePhrase(text) && lastQuery){ payload.more=true; payload.prev_query=lastQuery; payload.prev_kind=lastKind; }

  appendUser(text); saveLog(); msg.value=""; msg.disabled=true; sendBtn.disabled=true; sendBtn.classList.add('dim');
  const marker=document.createElement('div'); marker.textContent="🤖: …"; log.appendChild(marker); log.scrollTop=log.scrollHeight;

  try{
    const res = await fetch("/chat",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    if(!res.ok){ const raw = await res.text(); marker.textContent="⚠️ Erreur "+res.status+": "+raw; saveLog(); return; }
    let data; try{ data = await res.json(); } catch(e){ marker.textContent="⚠️ Réponse non-JSON: "+e.message; saveLog(); return; }
    marker.remove();

    if(data && data.meta && data.meta.query_used){ lastQuery=data.meta.query_used; lastKind=data.meta.kind||""; localStorage.setItem('lastMediaQuery', lastQuery); localStorage.setItem('lastMediaKind', lastKind); }

    appendAssistant((data && (data.reply || data.error)) ? (data.reply || data.error) : "⚠️ Réponse vide.");
    if(data && Array.isArray(data.media)){ appendMedia(data.media); }
    log.scrollTop=log.scrollHeight; saveLog();
  } catch(err){ marker.textContent="⚠️ Erreur réseau: "+err.message; saveLog(); }
  finally{ msg.disabled=false; sendBtn.disabled=false; sendBtn.classList.remove('dim'); msg.focus(); }
});

// --- Dictée (Web Speech API) multi-lang ---  (patch anti-répétitions)
let rec=null, recOn=false;
const SR_LANG_MAP = { 'ar-MA': 'ar-SA', 'fr-FR': 'fr-FR', 'en-US': 'en-US' };

if(('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window)){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  rec = new SR();
  rec.interimResults = true;
  rec.continuous = false;         // passe à true si tu veux mains libres
  rec.maxAlternatives = 1;

  let baseText = '';
  let finalTranscript = '';

  function upd(){ const uiLang = srLang.value || 'en-US'; rec.lang = SR_LANG_MAP[uiLang] || 'en-US'; }
  upd();
  srLang.addEventListener('change', ()=>{ try{ if(recOn) rec.stop(); }catch(_){} upd(); });

  rec.onstart = () => {
    recOn = true;
    micBtn.classList.add('rec'); micBtn.title='Enregistrement…';
    baseText = msg.value ? (msg.value.trim() + ' ') : '';
    finalTranscript = '';
  };

  rec.onresult = (e) => {
    let interim = '';
    for(let i = e.resultIndex; i < e.results.length; i++){
      const tr = e.results[i][0].transcript;
      if(e.results[i].isFinal){ finalTranscript += tr; }
      else { interim += tr; }
    }
    const combined = (finalTranscript + interim).trim();
    msg.value = (baseText + combined).replace(/\s+/g, ' ');
  };

  rec.onerror = (ev) => {
    console.warn('Speech error:', ev.error);
    micBtn.classList.remove('rec'); recOn=false; micBtn.title='Dictée';
  };

  rec.onend = () => { recOn = false; micBtn.classList.remove('rec'); micBtn.title='Dictée'; };
} else {
  micBtn.disabled=true; micBtn.title="Dictée non supportée (Chrome/Edge requis)";
}

micBtn.addEventListener('click', ()=>{ if(!rec) return; if(recOn){ try{ rec.stop(); }catch(_){}} else { try{ rec.start(); }catch(e){ console.warn(e); } }});
</script>
"""

@app.get("/")
def index():
    return render_template_string(HTML)

# ---------------- Backend /chat ----------------
@app.post("/chat")
def chat():
    data = request.json or {}
    user_msg = (data.get("message") or "").strip()
    more_flag = bool(data.get("more"))
    prev_query = (data.get("prev_query") or "").strip()
    prev_kind = (data.get("prev_kind") or "").strip()

    if not user_msg and not more_flag:
        return jsonify({"error": "message vide"}), 400

    lang = detect_lang(user_msg or prev_query)

    # --- "izidni" = plus d'éléments
    if more_flag and prev_query:
        q = prev_query; kind = prev_kind or "image"
        media = pexels_search_images(q, n=6) if kind=="image" else pexels_search_videos(q, n=6)
        reply = ("حاضر، هاوما نتائج أكثر:" if lang=="ar" else ("Voilà d’autres résultats:" if lang=="fr" else "Here are more results:")) + f" {q}"
        return jsonify({"reply": reply + debug_tag("more"), "media": media, "meta": {"query_used": q, "kind": kind, "count": len(media)}})

    # --- Génération explicite (si activée)
    gen_img_prompt = is_generate_image(user_msg)
    if gen_img_prompt:
        if ENABLE_GENERATION:
            try:
                data_url = sd_txt2img(gen_img_prompt)
                media = [{"type":"image","url":data_url,"thumb":data_url,"alt":gen_img_prompt}]
                msg = ("Image générée : " if lang=="fr" else ("تم إنشاء الصورة: " if lang=="ar" else "Image generated: ")) + gen_img_prompt
                return jsonify({"reply": msg + debug_tag("gen_img"), "media": media, "meta":{"query_used": gen_img_prompt, "kind":"image", "count":1}})
            except Exception:
                app.logger.exception("Erreur génération locale, fallback Pexels")
        media = pexels_search_images(gen_img_prompt, n=1)
        if media:
            msg = ("Voici une image trouvée : " if lang=="fr" else ("ها هي صورة: " if lang=="ar" else "Here is an image: ")) + gen_img_prompt
            return jsonify({"reply": msg + debug_tag("pexels_img"), "media": media, "meta":{"query_used": gen_img_prompt, "kind":"image", "count":1}})
        return jsonify({"reply": "Aucune image trouvée." + debug_tag("empty")})

    gen_vid_prompt = is_generate_video(user_msg)
    if gen_vid_prompt:
        if ENABLE_GENERATION:
            try:
                data_url = sd_txt2img(gen_vid_prompt)
                img_b64 = data_url.split(",",1)[1]
                video_url = svd_img2vid(img_b64)
                media = [{"type":"video","url":video_url,"thumb":None}]
                msg = ("Vidéo générée : " if lang=="fr" else ("تم إنشاء الفيديو: " if lang=="ar" else "Video generated: ")) + gen_vid_prompt
                return jsonify({"reply": msg + debug_tag("gen_vid"), "media": media, "meta":{"query_used": gen_vid_prompt, "kind":"video", "count":1}})
            except Exception:
                app.logger.exception("Erreur génération locale (vid), fallback Pexels")
        media = pexels_search_videos(gen_vid_prompt, n=1)
        if media:
            msg = ("Voici une vidéo trouvée : " if lang=="fr" else ("ها هو فيديو: " if lang=="ar" else "Here is a video: ")) + gen_vid_prompt
            return jsonify({"reply": msg + debug_tag("pexels_vid"), "media": media, "meta":{"query_used": gen_vid_prompt, "kind":"video", "count":1}})
        return jsonify({"reply": "Aucune vidéo trouvée." + debug_tag("empty")})

    # --- Recherche directe
    kind, q = extract_media_query(user_msg)
    if kind and q:
        media = pexels_search_images(q, n=1) if kind=="image" else pexels_search_videos(q, n=1)
        if media:
            msg = ("Voici :" if lang=="fr" else ("ها هو/هي :" if lang=="ar" else "Here it is:")) + f" {q}" + debug_tag("pexels_search")
            return jsonify({"reply": msg, "media": media, "meta":{"query_used": q, "kind": kind, "count": len(media)}})
        else:
            msg = ("Désolé, rien trouvé" if lang=="fr" else ("سمح ليا، مالقيتش" if lang=="ar" else "Sorry, nothing found"))
            return jsonify({"reply": f"{msg} ({q})" + debug_tag("pexels_search_empty")})

    # --- Sinon : LLM normal (texte)
    system_prompt = "أنت مساعد مفيد ومختصر. أجب بالعربية." if lang=="ar" else ("Tu es un assistant utile et concis. Réponds en français." if lang=="fr" else "You are a helpful and concise assistant. Reply in English.")
    try:
        resp = client.chat.completions.create(model=MODEL, messages=[{"role":"system","content":system_prompt},{"role":"user","content":user_msg}])
        reply = resp.choices[0].message.content.strip()
        return jsonify({"reply": reply + debug_tag("llm")})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    if not os.getenv("GROQ_API_KEY"):
        print("⚠️ GROQ_API_KEY est manquante dans l'environnement.")
    app.run(debug=True)
