from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Numeric, text
from sqlalchemy.engine import URL
from decimal import Decimal, InvalidOperation
import os

# Charge .env et écrase les anciennes variables si besoin
try:
    from dotenv import load_dotenv
    load_dotenv(override=True)
except Exception:
    pass

app = Flask(__name__, template_folder="templates")
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-secret-key")

# --- DB config ---
database_url = os.getenv("DATABASE_URL")
if database_url:
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
else:
    DB_USER = os.getenv("USER")
    DB_PASS = os.getenv("PASS")
    DB_HOST = os.getenv("HOST", "localhost")
    DB_PORT = int(os.getenv("PORT", "5432"))
    DB_NAME = os.getenv("NAME", "restaurant")
    app.config["SQLALCHEMY_DATABASE_URI"] = URL.create(
        "postgresql+psycopg2",
        username=DB_USER,
        password=DB_PASS,
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
    )

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# --- Categories ---
CATEGORIES = [
    ("main", "Main Courses"),
    ("dessert", "Desserts"),
    ("beverage", "Beverages"),
]
app.jinja_env.globals["CATEGORIES"] = CATEGORIES


# --- Model ---
class MenuItem(db.Model):
    __tablename__ = "menu_items"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(Numeric(10, 2), nullable=False)
    image_url = db.Column(db.String(500))  # optional
    category = db.Column(db.String(30), nullable=False, default="main")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": float(self.price),
            "image_url": self.image_url,
            "category": self.category,
        }


def ensure_schema():
    """Crée/complète la table si besoin (idempotent)."""
    with db.engine.begin() as conn:
        conn.execute(
            text(
                """
                CREATE TABLE IF NOT EXISTS menu_items (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(120) NOT NULL,
                    price NUMERIC(10,2) NOT NULL
                );
                """
            )
        )
        conn.execute(text("ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS image_url TEXT;"))
        conn.execute(
            text(
                "ALTER TABLE menu_items "
                "ADD COLUMN IF NOT EXISTS category VARCHAR(30) NOT NULL DEFAULT 'main';"
            )
        )


with app.app_context():
    try:
        ensure_schema()
    except Exception as e:
        print("[ensure_schema] skipped due to:", e)


# ------------- HTML UI ROUTES -------------

# Main Courses
@app.route("/")
def index():
    return redirect(url_for("menu_by_category", category="main"))

# Main Courses (redirect)
@app.route("/menu")
def menu():
    return redirect(url_for("menu_by_category", category="main"))

# SINGLE DEFINITION — do not duplicate this anywhere else
@app.route("/menu/<string:category>")
def menu_by_category(category):
    cat = (category or "main").lower()
    valid = {c for c, _ in CATEGORIES}
    if cat not in valid:
        flash("Unknown category.", "danger")
        return redirect(url_for("menu_by_category", category="main"))

    sort = (request.args.get("sort") or "").lower()
    view = (request.args.get("view") or "grid").lower()

    q = MenuItem.query.filter_by(category=cat)
    if sort == "name_asc":
        q = q.order_by(MenuItem.name.asc())
    elif sort == "price_asc":
        q = q.order_by(MenuItem.price.asc())
    elif sort == "price_desc":
        q = q.order_by(MenuItem.price.desc())
    else:
        q = q.order_by(MenuItem.id.asc())

    items = q.all()
    return render_template("menu.html", items=items, category=cat, view=view, sort=sort)

# Add item
@app.route("/add", methods=["GET", "POST"])
def add_item():
    if request.method == "POST":
        name = (request.form.get("name") or "").strip()
        price_raw = (request.form.get("price") or "").strip()
        image_url = (request.form.get("image_url") or "").strip()
        category = (request.form.get("category") or "main").strip().lower()

        if not name or not price_raw:
            flash("Name and price are required.", "danger")
            return redirect(url_for("add_item", category=category))

        try:
            price = Decimal(price_raw)
        except InvalidOperation:
            flash("Price must be a valid number.", "danger")
            return redirect(url_for("add_item", category=category))

        item = MenuItem(name=name, price=price, image_url=image_url or None, category=category)
        db.session.add(item)
        db.session.commit()
        flash(f'Item "{name}" added.', "success")
        return redirect(url_for("menu_by_category", category=category))

    return render_template("add.html")

# Update item
@app.route("/update/<int:item_id>", methods=["GET", "POST"])
def update_item(item_id):
    item = MenuItem.query.get_or_404(item_id)
    if request.method == "POST":
        name = (request.form.get("name") or "").strip()
        price_raw = (request.form.get("price") or "").strip()
        image_url = (request.form.get("image_url") or "").strip()
        category = (request.form.get("category") or item.category).strip().lower()

        if not name or not price_raw:
            flash("Name and price are required.", "danger")
            return redirect(url_for("update_item", item_id=item_id))

        try:
            price = Decimal(price_raw)
        except InvalidOperation:
            flash("Price must be a valid number.", "danger")
            return redirect(url_for("update_item", item_id=item_id))

        item.name = name
        item.price = price
        item.image_url = image_url or None
        item.category = category
        db.session.commit()
        flash(f'Item "{name}" updated.', "success")
        return redirect(url_for("menu_by_category", category=category))

    return render_template("update.html", item=item)

# Delete item
@app.route("/delete/<int:item_id>", methods=["POST"])
def delete_item(item_id):
    item = MenuItem.query.get_or_404(item_id)
    cat = item.category
    db.session.delete(item)
    db.session.commit()
    flash(f'Item "{item.name}" deleted.', "warning")
    return redirect(url_for("menu_by_category", category=cat))


# ------------- JSON API ROUTES -------------

@app.route("/api/menu", methods=["GET"])
def api_list_menu():
    q_cat = (request.args.get("category") or "").strip().lower()
    query = MenuItem.query
    if q_cat:
        query = query.filter_by(category=q_cat)
    items = query.order_by(MenuItem.id.asc()).all()
    return jsonify([i.to_dict() for i in items])

@app.route("/api/menu", methods=["POST"])
def api_add_menu():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    price_raw = str(data.get("price", "")).strip()
    image_url = (data.get("image_url") or "").strip()
    category = (data.get("category") or "main").strip().lower()

    if not name or not price_raw:
        return jsonify({"error": "name and price are required"}), 400

    try:
        price = Decimal(price_raw)
    except InvalidOperation:
        return jsonify({"error": "price must be numeric"}), 400

    item = MenuItem(name=name, price=price, image_url=image_url or None, category=category)
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

@app.route("/api/menu/<int:item_id>", methods=["PUT"])
def api_update_menu(item_id):
    item = MenuItem.query.get_or_404(item_id)
    data = request.get_json(silent=True) or {}

    name = (data.get("name") or item.name).strip()
    price_val = data.get("price", item.price)
    image_url = (data.get("image_url") or item.image_url)
    category = (data.get("category") or item.category).strip().lower()

    try:
        price = Decimal(str(price_val))
    except InvalidOperation:
        return jsonify({"error": "price must be numeric"}), 400

    item.name = name
    item.price = price
    item.image_url = image_url or None
    item.category = category
    db.session.commit()
    return jsonify(item.to_dict())

@app.route("/api/menu/<int:item_id>", methods=["DELETE"])
def api_delete_menu(item_id):
    item = MenuItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"deleted": item_id})


if __name__ == "__main__":
    app.run(debug=True)
