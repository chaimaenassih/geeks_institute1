import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()  

conn = psycopg2.connect(
    host=os.getenv("HOST"),
    port=os.getenv("PORT"),
    database=os.getenv("DATABASE") or os.getenv("NAME"),
    user=os.getenv("USER"),
    password=os.getenv("PASSWORD"),
)

DDL = """
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  vin VARCHAR(17) UNIQUE NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT CHECK (year >= 1886),
  price NUMERIC(12,2) CHECK (price >= 0),
  color VARCHAR(30),
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS salespeople (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  photo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS sales (
  id SERIAL PRIMARY KEY,
  vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
  customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
  salesperson_id INT REFERENCES salespeople(id) ON DELETE SET NULL,
  sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
  sale_price NUMERIC(12,2) NOT NULL
);
"""

with conn, conn.cursor() as cur:
    cur.execute(DDL)

print("Tables créées (si elles n'existaient pas déjà)")
