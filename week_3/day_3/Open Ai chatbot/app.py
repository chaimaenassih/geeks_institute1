from flask import Flask, request, jsonify, render_template_string
from dotenv import load_dotenv, find_dotenv
from groq import Groq
import os
import re

load_dotenv(find_dotenv(usecwd=True))
app = Flask(__name__)

MODEL = os.getenv("MODEL", "llama-3.1-8b-instant")
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# --- Détection simple FR/EN
FR_STOP = {
    "le","la","les","un","une","des","de","du","et","est","sont","je","tu","il","elle","nous","vous","ils",
    "bonjour","salut","merci","svp","s'il","pourquoi","comment","quoi","avec","sans","dans","sur","pas",
    "c'est","ça","au","aux","être","avoir"
}
EN_STOP = {
    "the","a","an","and","is","are","am","i","you","he","she","we","they","hello","hi","thanks","please",
    "why","how","what","with","without","in","on","not","it's","of","to","for","do","does","did"
}
ACCENT_RE = re.compile(r"[éèêëàâäîïôöùûüç]")

def detect_lang(text: str) -> str:
    t = text.lower()
    if ACCENT_RE.search(t):
        return "fr"
    toks = re.findall(r"[a-zA-Z']+", t)
    fr = sum(tok in FR_STOP for tok in toks)
    en = sum(tok in EN_STOP for tok in toks)
    if fr > en: return "fr"
    if en > fr: return "en"
    if any(w in t for w in ["bonjour","salut","merci","svp"]): return "fr"
    return "en"

HTML = """
<!doctype html>
<meta charset="utf-8">
<title>Chatbot (Groq free tier)</title>
<style>
  :root{
    --card:#ffffff; --text:#0f172a; --muted:#475569;
    --bg:#eef2ff;                /* fond : indigo très clair */
    --border:#e5e7eb; --primary:#4f46e5; --primary-2:#4338ca;
    --chip:#eef2ff;
  }
  body.dark{
    --card:#0b1220; --text:#e5e7eb; --muted:#94a3b8;
    --bg:#0a0f1a; --border:#1f2937; --primary:#6366f1; --primary-2:#4f46e5;
    --chip:#111827;
  }

  html,body{height:100%}
  body{
    margin:0; background:var(--bg); color:var(--text);
    font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Noto Sans",sans-serif;
    display:flex; align-items:center; justify-content:center; padding:24px;
  }

  .card{
    width:min(92vw,880px);
    background:var(--card); border:1px solid var(--border); border-radius:16px;
    box-shadow:0 10px 30px rgba(2,6,23,.08); overflow:hidden;
  }

  .header{ display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--border); }
  .brand{ display:flex; gap:12px; align-items:center; }
  .avatar{
    width:40px;height:40px;border-radius:50%; background:var(--primary);
    color:#fff; display:grid; place-items:center; font-weight:700;
  }
  .titles{ line-height:1.15 }
  .titles .title{ font-size:18px; font-weight:700 }
  .titles .subtitle{ font-size:13px; color:var(--muted) }

  .actions{ display:flex; gap:8px }
  .btn{
    border:1px solid var(--border); background:transparent; color:var(--text);
    padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:600;
  }
  .btn.primary{ border:none; background:var(--primary); color:#fff }
  .btn.primary:hover{ background:var(--primary-2) }
  .btn:active{ transform:translateY(1px) }

  #log{
    padding:14px; min-height:320px; max-height:58vh; overflow:auto;
    white-space:pre-wrap; background:color-mix(in srgb, var(--card) 90%, #000 0%);
  }
  .hint{ color:var(--muted); font-size:12px; padding:6px 16px 12px }

  .composer{ display:flex; gap:10px; padding:12px; border-top:1px solid var(--border); }
  .composer input{
    flex:1; padding:12px 12px; font-size:16px; border-radius:10px;
    border:1px solid var(--border); outline:none; background:var(--card); color:var(--text);
  }
  .composer input:focus{ border-color:var(--primary); box-shadow:0 0 0 3px color-mix(in srgb, var(--primary) 22%, transparent); }

  .attach{
    display:inline-flex; align-items:center; justify-content:center;
    width:44px; height:44px; border-radius:12px; border:1px solid var(--border);
    background:transparent; cursor:pointer; font-size:24px; line-height:1;
  }
  .chip{
    display:inline-flex; align-items:center; gap:6px; padding:6px 10px; margin:6px 0 0 12px;
    background:var(--chip); border:1px solid var(--border); border-radius:999px; font-size:12px; color:var(--muted);
  }
  .dim{ opacity:.6 }
</style>

<div class="card">
  <div class="header">
    <div class="brand">
      <div class="avatar">AI</div>
      <div class="titles">
        <div class="title">My Chatbot</div>
        <div class="subtitle">Ask anything — friendly UI.</div>
      </div>
    </div>
    <div class="actions">
      <button id="clear" class="btn">Clear</button>
      <button id="theme" class="btn">Theme</button>
    </div>
  </div>

  <div id="log"></div>
  <div class="hint">Note: This UI sends a JSON request to <code>/chat</code>.</div>

  <form id="f" class="composer">
    <input id="msg" placeholder="Type your question..." autocomplete="off" />
    <label class="attach" title="Ajouter un fichier">
      +
      <input id="file" type="file" hidden />
    </label>
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

  function saveLog(){ localStorage.setItem('chatLog', log.textContent); }
  function restore(){
    const saved = localStorage.getItem('chatLog'); if(saved) log.textContent = saved;
    const theme = localStorage.getItem('theme'); if(theme === 'dark') document.body.classList.add('dark');
  }
  restore();

  btnTheme.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  btnClear.addEventListener('click', ()=>{
    log.textContent = '';
    chip.style.display = 'none';
    localStorage.removeItem('chatLog');
  });

  fileInput.addEventListener('change', ()=>{
    if(fileInput.files && fileInput.files[0]){
      fileNameSpan.textContent = fileInput.files[0].name;
      chip.style.display = 'inline-flex';
    } else {
      chip.style.display = 'none';
    }
  });

  f.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const text = msg.value.trim();
    if(!text) return;

    log.textContent += "\\n🧑‍💻: " + text;
    saveLog();
    msg.value = "";
    msg.disabled = true; sendBtn.disabled = true; sendBtn.classList.add('dim');

    // Afficher un petit “…” en attendant
    const marker = "\\n🤖: …";
    log.textContent += marker;
    log.scrollTop = log.scrollHeight;

    try{
      const res = await fetch("/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({message:text})
      });

      // Gestion statut HTTP
      if(!res.ok){
        const raw = await res.text();
        // Remplace le “…” par l’erreur
        log.textContent = log.textContent.replace(marker, "\\n⚠️ Erreur " + res.status + ": " + raw);
        saveLog();
        return;
      }

      // Tentative de JSON
      let data;
      try {
        data = await res.json();
      } catch (e) {
        log.textContent = log.textContent.replace(marker, "\\n⚠️ Réponse non-JSON: " + e.message);
        saveLog();
        return;
      }

      const out = (data && (data.reply || data.error)) ? (data.reply || data.error) : "⚠️ Réponse vide.";
      log.textContent = log.textContent.replace(marker, "\\n🤖: " + out);
      log.scrollTop = log.scrollHeight;
      saveLog();

    } catch(err){
      // Erreur réseau / fetch bloqué
      log.textContent = log.textContent.replace(marker, "\\n⚠️ Erreur réseau: " + err.message);
      saveLog();
    } finally {
      msg.disabled = false; sendBtn.disabled = false; sendBtn.classList.remove('dim');
      msg.focus();
    }
  });
</script>
"""

@app.get("/")
def index():
    return render_template_string(HTML)

@app.post("/chat")
def chat():
    user_msg = (request.json or {}).get("message", "").strip()
    if not user_msg:
        return jsonify({"error": "message vide"}), 400

    lang = detect_lang(user_msg)
    if lang == "fr":
        system_prompt = "Tu es un assistant utile et concis. Réponds en français."
    else:
        system_prompt = "You are a helpful and concise assistant. Reply in English."

    try:
        resp = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_msg},
            ],
        )
        reply = resp.choices[0].message.content.strip()
        return jsonify({"reply": reply})
    except Exception as e:
        # IMPORTANT : on renvoie un JSON, pour que le frontend puisse afficher l'erreur
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Vérification minimale en console si la clé est absente
    if not os.getenv("GROQ_API_KEY"):
        print("⚠️  GROQ_API_KEY est manquante dans l'environnement.")
    app.run(debug=True)
