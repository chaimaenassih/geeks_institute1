from flask import Blueprint, render_template, request, redirect, url_for, flash
import psycopg2.extras
from database.index import get_db_connection

salespeople_bp = Blueprint("salespeople", __name__, url_prefix="/salespeople")


def get_salesperson(sp_id: int):
    """Retourne un commercial (DictRow) ou None."""
    conn = get_db_connection()
    if conn is None:
        return None
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute("SELECT * FROM salespeople WHERE id = %s", (sp_id,))
    sp = cur.fetchone()
    cur.close()
    conn.close()
    return sp


# --- Liste des commerciaux ---
@salespeople_bp.route("/")
def index():
    show = request.args.get("show")
    conn = get_db_connection()
    if conn is None:
        flash("ERROR: Could not connect to the database.", "error")
        return render_template("salespeople/index.html", salespeople=[])

    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    if show == "archived":
        cur.execute("SELECT * FROM salespeople WHERE is_active = FALSE ORDER BY name")
    else:
        cur.execute("SELECT * FROM salespeople WHERE is_active = TRUE ORDER BY name")
    salespeople = cur.fetchall()
    cur.close()
    conn.close()

    return render_template("salespeople/index.html", salespeople=salespeople, show=show)


# --- Détails d’un commercial ---
@salespeople_bp.route("/<int:sp_id>")
def details(sp_id: int):
    """
    Affiche la fiche d'un vendeur avec :
      - cnt  : nombre de ventes
      - total: SOMME des PRIX ACTUELS des véhicules vendus (v.price)
    -> Le total se met à jour automatiquement si tu modifies vehicles.price.
    """
    conn = get_db_connection()
    if conn is None:
        flash("ERROR: Could not connect to the database.", "error")
        return redirect(url_for("salespeople.index"))

    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Récupérer le vendeur
    cur.execute("SELECT * FROM salespeople WHERE id = %s", (sp_id,))
    sp = cur.fetchone()
    if not sp:
        cur.close(); conn.close()
        flash("Salesperson not found.", "error")
        return redirect(url_for("salespeople.index"))

    # ---- Stats basées sur le PRIX ACTUEL du véhicule ----
    cur.execute(
        """
        SELECT COUNT(s.id) AS cnt,
               COALESCE(SUM(v.price), 0) AS total
        FROM sales s
        JOIN vehicles v ON v.id = s.vehicle_id
        WHERE s.salesperson_id = %s
        """,
        (sp_id,),
    )
    stats = cur.fetchone()

    cur.close()
    conn.close()

    return render_template("salespeople/details.html", sp=sp, stats=stats)


# --- Créer un commercial ---
@salespeople_bp.route("/create", methods=("GET", "POST"))
def create():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        phone = request.form.get("phone")
        photo_url = request.form.get("photo_url")

        if not name or not email:
            flash("Name and Email are required!", "error")
        else:
            conn = get_db_connection()
            if conn is None:
                flash("ERROR: Could not connect to the database.", "error")
                return redirect(url_for("salespeople.index"))

            cur = conn.cursor()
            cur.execute(
                """
                INSERT INTO salespeople (name, email, phone, photo_url, is_active)
                VALUES (%s, %s, %s, %s, TRUE)
                """,
                (name, email, phone, photo_url),
            )
            conn.commit()
            cur.close()
            conn.close()
            flash("Salesperson added successfully!", "success")
            return redirect(url_for("salespeople.index"))

    return render_template("salespeople/create.html")


# --- Archiver un commercial ---
@salespeople_bp.route("/<int:sp_id>/delete", methods=("POST",))
def delete(sp_id: int):
    sp = get_salesperson(sp_id)
    if not sp:
        flash("Salesperson not found.", "error")
        return redirect(url_for("salespeople.index"))

    conn = get_db_connection()
    if conn is None:
        flash("ERROR: Could not connect to the database.", "error")
        return redirect(url_for("salespeople.index"))

    cur = conn.cursor()
    cur.execute("UPDATE salespeople SET is_active = FALSE WHERE id = %s", (sp_id,))
    conn.commit()
    cur.close()
    conn.close()
    flash("Salesperson archived.", "success")
    return redirect(url_for("salespeople.index"))


# --- Restaurer un commercial ---
@salespeople_bp.route("/<int:sp_id>/restore", methods=("POST",))
def restore(sp_id: int):
    sp = get_salesperson(sp_id)
    if not sp:
        flash("Salesperson not found.", "error")
        return redirect(url_for("salespeople.index", show="archived"))

    conn = get_db_connection()
    if conn is None:
        flash("ERROR: Could not connect to the database.", "error")
        return redirect(url_for("salespeople.index", show="archived"))

    cur = conn.cursor()
    cur.execute("UPDATE salespeople SET is_active = TRUE WHERE id = %s", (sp_id,))
    conn.commit()
    cur.close()
    conn.close()
    flash("Salesperson restored.", "success")
    return redirect(url_for("salespeople.index", show="archived"))
