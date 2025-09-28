# database/index.py
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    # Tolérant: lit DATABASE ou NAME (selon ton .env)
    database = os.getenv("DATABASE") or os.getenv("NAME")
    return psycopg2.connect(
        host=os.getenv("HOST", "localhost"),
        port=os.getenv("PORT", "5432"),
        database=database,
        user=os.getenv("USER", "postgres"),
        password=os.getenv("PASSWORD", "postgres"),
        cursor_factory=RealDictCursor,
    )
