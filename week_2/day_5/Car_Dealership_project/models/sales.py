# models/sales.py
from flask import Blueprint, render_template, request, redirect, url_for, flash
from datetime import date
from database.index import get_db_connection

sales_bp = Blueprint("sales", __name__, template_folder="../templates")

@sales_bp.route("/sales")
def sales_index():
    """
    List all recorded sales with joined vehicle, customer, and salesperson info.
    """
    conn = get_db_connection()
    if conn is None:
        flash("ERROR: Could not connect to the database.", "error")
        return redirect(url_for("vehicles.index"))

    cur = conn.cursor()
    cur.execute("""
      SELECT s.id, s.sale_date, s.sale_price,
             v.id AS vehicle_id, v.make, v.model, v.year, v.vin,
             c.id AS customer_id, c.name AS customer_name,
             sp.id AS salesperson_id, sp.name AS salesperson_name
      FROM sales s
      JOIN vehicles v ON v.id = s.vehicle_id
      JOIN customers c ON c.id = s.customer_id
      LEFT JOIN salespeople sp ON sp.id = s.salesperson_id
      ORDER BY s.sale_date DESC, s.id DESC
    """)
    sales = cur.fetchall()
    cur.close(); conn.close()

    return render_template("sales/index.html", sales=sales)

@sales_bp.route("/sales/new/<int:vehicle_id>", methods=["GET", "POST"])
def new_sale(vehicle_id: int):
    """
    Record a sale for a vehicle (customer required, salesperson optional).
    - GET: shows form with customers and ONLY ACTIVE salespeople.
    - POST: validates and inserts; prevents selling the same vehicle twice.
    - Supports 'customer_id' preselection via query string when returning from Add Customer.
    """
    conn = get_db_connection()
    if conn is None:
        flash("ERROR: Could not connect to the database.", "error")
        return redirect(url_for("vehicles.index"))
    cur = conn.cursor()

    # Ensure vehicle exists
    cur.execute("SELECT id, make, model, year, vin, price FROM vehicles WHERE id=%s", (vehicle_id,))
    vehicle = cur.fetchone()
    if not vehicle:
        cur.close(); conn.close()
        flash("Vehicle not found.", "error")
        return redirect(url_for("vehicles.index"))

    # If already sold, block (one sale per vehicle)
    cur.execute("SELECT 1 FROM sales WHERE vehicle_id=%s", (vehicle_id,))
    already = cur.fetchone()

    if request.method == "POST":
        # Read form values
        customer_id = request.form.get("customer_id")
        salesperson_id = request.form.get("salesperson_id") or None
        sale_date = request.form.get("sale_date") or date.today().isoformat()

        # Validate price numeric
        try:
            sale_price = float((request.form.get("sale_price") or "").strip())
        except Exception:
            # reload dropdowns, keep selection
            cur.execute("SELECT id, name FROM customers ORDER BY name")
            customers = cur.fetchall()
            cur.execute("SELECT id, name FROM salespeople WHERE is_active = TRUE ORDER BY name")
            salespeople = cur.fetchall()
            flash("Sale price must be a number.", "error")
            out = render_template(
                "sales/new.html",
                vehicle=vehicle,
                customers=customers,
                salespeople=salespeople,
                today=date.today().isoformat(),
                selected_customer_id=customer_id
            )
            cur.close(); conn.close()
            return out

        # Prevent double sale
        if already:
            cur.close(); conn.close()
            flash("This vehicle is already sold.", "error")
            return redirect(url_for("vehicles.details", vehicle_id=vehicle_id))

        # Insert the sale
        try:
            cur.execute("""
              INSERT INTO sales (vehicle_id, customer_id, salesperson_id, sale_date, sale_price)
              VALUES (%s, %s, %s, %s, %s)
            """, (vehicle_id, customer_id, salesperson_id, sale_date, sale_price))
            conn.commit()
            flash("Sale recorded successfully!", "success")
        except Exception as e:
            conn.rollback()
            # reload dropdowns on DB error, keep selection
            cur.execute("SELECT id, name FROM customers ORDER BY name")
            customers = cur.fetchall()
            cur.execute("SELECT id, name FROM salespeople WHERE is_active = TRUE ORDER BY name")
            salespeople = cur.fetchall()
            flash(f"Database error while saving: {e}", "error")
            out = render_template(
                "sales/new.html",
                vehicle=vehicle,
                customers=customers,
                salespeople=salespeople,
                today=date.today().isoformat(),
                selected_customer_id=customer_id
            )
            cur.close(); conn.close()
            return out
        finally:
            cur.close(); conn.close()

        return redirect(url_for("vehicles.details", vehicle_id=vehicle_id))

    # --- GET: load dropdowns and support preselecting a customer ----
    selected_customer_id = request.args.get("customer_id")  # from /customers/new redirect
    cur.execute("SELECT id, name FROM customers ORDER BY name")
    customers = cur.fetchall()
    # Only ACTIVE salespeople in dropdowns (archived are hidden)
    cur.execute("SELECT id, name FROM salespeople WHERE is_active = TRUE ORDER BY name")
    salespeople = cur.fetchall()
    cur.close(); conn.close()

    return render_template(
        "sales/new.html",
        vehicle=vehicle,
        customers=customers,
        salespeople=salespeople,
        today=date.today().isoformat(),
        selected_customer_id=selected_customer_id
    )