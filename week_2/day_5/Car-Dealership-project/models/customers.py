from flask import Blueprint, render_template, request, redirect, url_for, flash
from database.index import get_db_connection

customers_bp = Blueprint("customers", __name__, template_folder="../templates")

@customers_bp.route("/customers/new", methods=["GET", "POST"])
def new_customer():
    next_url = request.args.get("next")

    if request.method == "POST":
        name  = (request.form.get("name") or "").strip()
        email = (request.form.get("email") or "").strip()
        phone = (request.form.get("phone") or "").strip() or None

        if not name or not email:
            flash("Name and Email are required.", "error")
            return render_template("customers/new.html", name=name, email=email, phone=phone, next_url=next_url)

        conn = get_db_connection()
        if conn is None:
            flash("ERROR: Could not connect to the database.", "error")
            return redirect(next_url or url_for("vehicles.index"))

        cur = conn.cursor()
        try:
            # Add unique index on email in DB if you want to enforce uniqueness
            cur.execute(
                "INSERT INTO customers (name, email, phone) VALUES (%s, %s, %s) RETURNING id",
                (name, email, phone),
            )
            new_id = cur.fetchone()["id"]
            conn.commit()
            flash("Customer added successfully!", "success")
        except Exception as e:
            conn.rollback()
            flash(f"Database error: {e}", "error")
            return render_template("customers/new.html", name=name, email=email, phone=phone, next_url=next_url)
        finally:
            cur.close()
            conn.close()

        if next_url:
            sep = "&" if "?" in next_url else "?"
            return redirect(f"{next_url}{sep}customer_id={new_id}")

        return redirect(url_for("vehicles.index"))

    return render_template("customers/new.html", next_url=next_url)