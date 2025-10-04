from __future__ import annotations
import os
import psycopg2
from menu_item import MenuItem


try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

def _get_connection():
    pwd = os.getenv("PGPASSWORD")
    if not pwd:
        raise RuntimeError("PGPASSWORD is not set (use environment var or .env)")
    return psycopg2.connect(
        host=os.getenv("PGHOST", "127.0.0.1"),
        port=os.getenv("PGPORT", "5432"),
        dbname=os.getenv("PGDATABASE", "restaurant"),
        user=os.getenv("PGUSER", "postgres"),
        password=pwd,
    )

class MenuManager:
    @classmethod
    def get_by_name(cls, name: str) -> MenuItem | None:
        sql = '''
            SELECT item_id, item_name, item_price
            FROM public."Menu_Items"
            WHERE item_name = %s
            ORDER BY item_id
            LIMIT 1;
        '''
        with _get_connection() as conn, conn.cursor() as cur:
            cur.execute(sql, (name,))
            row = cur.fetchone()
            if not row:
                return None
            item_id, item_name, item_price = row
            return MenuItem(item_name, int(item_price), item_id=item_id)

    @classmethod
    def all_items(cls) -> list[MenuItem]:
        sql = 'SELECT item_id, item_name, item_price FROM public."Menu_Items" ORDER BY item_id;'
        items: list[MenuItem] = []
        with _get_connection() as conn, conn.cursor() as cur:
            cur.execute(sql)
            for item_id, item_name, item_price in cur.fetchall():
                items.append(MenuItem(item_name, int(item_price), item_id=item_id))
        return items

    @classmethod
    def all(cls) -> list[MenuItem]:
        return cls.all_items()
