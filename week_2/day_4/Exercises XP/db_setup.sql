
CREATE TABLE IF NOT EXISTS public."Menu_Items" (
  item_id    SERIAL PRIMARY KEY,
  item_name  VARCHAR(30) NOT NULL,
  item_price SMALLINT    DEFAULT 0
);

-- Exemples (idempotents)
INSERT INTO public."Menu_Items"(item_name, item_price) VALUES
  ('Burger', 35),
  ('Pizza', 60),
  ('Salade', 25),
  ('Tiramisu', 30)
ON CONFLICT DO NOTHING;
