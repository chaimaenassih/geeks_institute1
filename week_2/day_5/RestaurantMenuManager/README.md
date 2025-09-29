🍔 Restaurant Menu Manager

A sleek web app built with Flask and PostgreSQL for effortlessly managing a restaurant's menu. This tiny but powerful tool provides a complete CRUD (Create, Read, Update, Delete) interface for menu items, along with features for organization, search, and presentation.

---

## ▶️ Project Video
https://youtu.be/20KYq8Pypak
---

✨ Features

    Categorized Menu View: Navigate through your menu with dedicated views for Main, Desserts, and Beverages. Access them via intuitive URLs like /menu/main.

    Full CRUD Functionality: Easily add, update, or delete menu items.

    Flexible Image Handling: Display images for each item using a URL, with an automatic placeholder fallback for when an image isn't available.

    Dynamic UI: Switch between a clean grid and a classic table layout. Features a client-side search and the ability to sort items by name or price.

    JSON API: A built-in API at /api/menu provides a JSON representation of your menu for easy integration with other services.

💻 Tech Stack

    Backend: Flask for the web framework, with Jinja2 for templating.

    Database: PostgreSQL handles the data, powered by SQLAlchemy and psycopg2.

    Frontend: A lightweight, build-free setup using Tailwind CSS via CDN for styling.

🚀 Quick Start

Ready to get it running? Follow these simple steps.

1. Clone the repository

> git clone <your-repo-url>
> cd restaurant_menu_manager

2. Set up your environment

Using uv is the fastest way to get started.

>  uv venv
>  uv pip install -r requirements.txt

Alternatively, use pip.

>  python -m venv .venv

On macOS/Linux

>  source .venv/bin/activate

On Windows

> .\.venv\Scripts\activate

> pip install -r requirements.txt

3. PostgreSQL setup

First, create a database. For better security, it's recommended to create a dedicated user as well.
SQL

-- Connect to your PostgreSQL server and run these commands
CREATE DATABASE restaurant;

> Run The file  all schema.sql

4. Environment variables

Create a .env file in the project's root directory. You can use either a single database URL or separate fields.

Option A: Single URL
Ini, TOML

DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@127.0.0.1:5432/restaurant

Option B: Separate Fields
Ini, TOML

USER=postgres
PASS=YOUR_PASSWORD
HOST=127.0.0.1
PORT=5432
NAME=restaurant

Note: Use 127.0.0.1 instead of localhost to prevent potential IPv6 authentication issues.

Also, be sure to set a secret key for Flask.
Ini, TOML

FLASK_SECRET_KEY=change-me

5. Run the app

You're all set! Use uv for a quick start, or a standard Python command.
Bash

with uv

> uv run app.py

with standard python

> python app.py

Now, navigate to http://127.0.0.1:5000 in your browser and start managing your menu! 🚀