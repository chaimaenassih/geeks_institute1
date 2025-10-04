-- À lancer dans psql sur la DB 'restaurant'
CREATE TABLE IF NOT EXISTS public."Menu_Items" (
  item_id    SERIAL PRIMARY KEY,
  item_name  VARCHAR(30) NOT NULL,
  item_price SMALLINT    DEFAULT 0
);


INSERT INTO public."Menu_Items"(item_name, item_price)
SELECT name, LEAST(32767, GREATEST(0, ROUND(price)))::SMALLINT
FROM public.menu_items;
