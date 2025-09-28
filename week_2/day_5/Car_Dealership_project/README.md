# 🚗 **Dealership Pro** — Flask Inventory & Sales

Manage a car dealership’s inventory with **CRUD**, **search**, **pagination**, and a sleek **Stats dashboard (Chart.js)**.  
Optional flows include **Sales**, **Customers**, and **Salespeople** (with soft-archive).  
UI: **Tailwind CSS (CDN)** · Charts: **Chart.js (CDN)** · DB: **PostgreSQL** via `psycopg2`.

---

## 📚 Table of Contents

- [Requirements](#-requirements)
- [Quickstart](#-quickstart)
- [Create & Activate a Virtual Environment (venv)](#-create--activate-a-virtual-environment-venv)
  - [Windows (PowerShell / cmd)](#windows-powershell--cmd)
  - [macOS / Linux](#macos--linux)
- [Install Dependencies](#-install-dependencies)
- [Environment Variables](#-environment-variables)
- [Database Setup (PostgreSQL)](#-database-setup-postgresql)
- [Run the App](#-run-the-app)

---

## ✅ Requirements

- **Python** 3.10+
- **PostgreSQL** 13+ (local or remote)
- **pip** & **venv**

---

## ⚡ Quickstart

```bash
# 1) clone and cd
git clone <your-repo-url> dealership-pro
cd dealership-pro

# 2) create venv (pick your OS block below)
python -m venv .venv        # macOS/Linux
# or
py -3 -m venv .venv         # Windows

# 3) activate venv
source .venv/bin/activate   # macOS/Linux
# or
.\.venv\Scripts\Activate.ps1  # Windows PowerShell

# 4) install deps
python -m pip install --upgrade pip
pip install -r requirements.txt   # or see “Install Dependencies”

# 5) configure env
# If .env.example exists:
cp .env.example .env
# Otherwise create .env from the snippet in “Environment Variables”

# 6) create db & seed
createdb dealership
psql -d dealership -f index.sql

# 7) run
python index.py
# open http://127.0.0.1:PORT
```

---

## 🧪 Create & Activate a Virtual Environment (venv)

A **venv** isolates Python packages per project.

### Windows (PowerShell / cmd)

```powershell
# Create
py -3 -m venv .venv

# Activate (PowerShell)
.\.venv\Scripts\Activate.ps1
# If you see a policy error for scripts:
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Activate (cmd.exe)
.\.venv\Scriptsctivate.bat
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

To **deactivate** later:
```bash
deactivate
```

---

## 📦 Install Dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

*No local setup needed for Tailwind/Chart.js—they’re loaded via CDN in templates.*

---

## 🔐 Environment Variables

Create a **`.env`** file in the project root.

**Required (sessions/flash):**
```env
SECRET_KEY=change-me-to-a-long-random-string
```

**Database config — choose ONE style that matches your `database/index.py`:**

**A) DSN URL (recommended)**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dealership
```

**B) Separate variables**  
> Use names your connector expects. Common patterns:

**Postgres-style:**
```env
PGHOST=localhost
PGPORT=5432
PGDATABASE=dealership
PGUSER=postgres
PGPASSWORD=postgres
```

**Generic style (if your code uses these):**
```env
HOST=localhost
PORT=5432
DATABASE=dealership
USER=postgres
PASSWORD=postgres
```

---

## 🗄 Database Setup (PostgreSQL)

```bash
# macOS/Linux
createdb dealership
psql -d dealership -f index.sql

# Windows (psql)
# createdb dealership   (if available)
# psql -d dealership -f index.sql
```

---

## ▶️ Run the App

**Option A — Python:**
```bash
python index.py
```

**Option B — Flask CLI:**
```bash
# PowerShell
$env:FLASK_APP = "index.py"; flask run

# cmd
set FLASK_APP=index.py && flask run

# macOS/Linux
export FLASK_APP=index.py
flask run
```

Open: **http://127.0.0.1:PORT**