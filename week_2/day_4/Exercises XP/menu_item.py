# menu_item.py
from __future__ import annotations
import os
import psycopg2

def _get_connection():
    return psycopg2.connect(
        host=os.getenv("PGHOST", "127.0.0.1"),
        port=os.getenv("PGPORT", "5432"),
        dbname=os.getenv("PGDATABASE", "restaurant"),
        user=os.getenv("PGUSER", "postgres"),
        password=os.getenv("PGPASSWORD", "zineb07"),
    )


class MenuItem:
    """Représente un item du menu."""
    def __init__(self, name: str, price: int, item_id: int | None = None):
        self.name = name
        self.price = int(price)   # SMALLINT
        self.item_id = item_id

    def save(self) -> bool:
        """INSERT l'item et récupère item_id."""
        if self.item_id is not None:
            return False
        sql = 'INSERT INTO public."Menu_Items"(item_name, item_price) VALUES (%s, %s) RETURNING item_id;'
        with _get_connection() as conn, conn.cursor() as cur:
            cur.execute(sql, (self.name, self.price))
            self.item_id = cur.fetchone()[0]
        return True

    def delete(self) -> bool:
        """DELETE par item_id si dispo, sinon par 1er item au même nom."""
        with _get_connection() as conn, conn.cursor() as cur:
            if self.item_id is not None:
                cur.execute('DELETE FROM public."Menu_Items" WHERE item_id = %s;', (self.item_id,))
            else:
                cur.execute(
                    '''
                    DELETE FROM public."Menu_Items"
                     WHERE item_id = (
                       SELECT item_id FROM public."Menu_Items"
                        WHERE item_name = %s
                        ORDER BY item_id
                        LIMIT 1
                     );
                    ''',
                    (self.name,),
                )
            return cur.rowcount == 1

    def update(self, new_name: str | None = None, new_price: int | None = None) -> bool:
        """UPDATE nom et/ou prix. Retourne True si exactement 1 ligne mise à jour."""
        if new_name is None and new_price is None:
            return False

        sets, params = [], []
        if new_name is not None:
            sets.append("item_name = %s")
            params.append(new_name)
        if new_price is not None:
            sets.append("item_price = %s")
            params.append(int(new_price))
        set_clause = ", ".join(sets)

        with _get_connection() as conn, conn.cursor() as cur:
            if self.item_id is not None:
                params.append(self.item_id)
                cur.execute(
                    f'UPDATE public."Menu_Items" SET {set_clause} WHERE item_id = %s;',
                    tuple(params),
                )
            else:
                params.append(self.name)
                cur.execute(
                    f'''
                    UPDATE public."Menu_Items"
                       SET {set_clause}
                     WHERE item_id = (
                       SELECT item_id FROM public."Menu_Items"
                        WHERE item_name = %s
                        ORDER BY item_id
                        LIMIT 1
                     );
                    ''',
                    tuple(params),
                )
            ok = (cur.rowcount == 1)

        if ok:
            if new_name is not None:
                self.name = new_name
            if new_price is not None:
                self.price = int(new_price)
        return ok
