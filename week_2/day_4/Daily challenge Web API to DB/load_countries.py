import os, random,requests, psycopg2

API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,population"

def get_conn():
    return psycopg2.connect(
        host=os.getenv("PGHOST", "127.0.0.1"),
        port=os.getenv("PGPORT", "5432"),
        dbname=os.getenv("PGDATABASE", "countries"),
        user=os.getenv("PGUSER", "postgres"),
        password=os.getenv("PGPASSWORD", ""),
    )

def norm(c):
    n = c.get("name") or {}
    name = n.get("common") or n.get("official")
    cap = c.get("capital")
    capital = cap[0] if isinstance(cap, list) and cap else (cap if isinstance(cap, str) else None)
    flags = c.get("flags") or {}
    flag = c.get("flag") or flags.get("svg") or flags.get("png")
    subregion = c.get("subregion")
    population = c.get("population")
    return (name, capital, flag, subregion, population)

def main():
    r = requests.get(API_URL, timeout=30)
    r.raise_for_status()
    data = r.json()
    rows = [norm(c) for c in random.sample(data, k=10)]
    sql = """INSERT INTO public.countries (name, capital, flag, subregion, population)
             VALUES (%s, %s, %s, %s, %s);"""
    with get_conn() as conn, conn.cursor() as cur:
        cur.executemany(sql, rows)

if __name__ == "__main__":
    main()
