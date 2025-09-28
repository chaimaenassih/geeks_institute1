from flask import Flask
from models import vehicles_bp, sales_bp, customers_bp, salespeople_bp

app = Flask(__name__)
app.secret_key = "dev"

app.register_blueprint(vehicles_bp,    url_prefix="/")              
app.register_blueprint(salespeople_bp, url_prefix="/salespeople")   
app.register_blueprint(customers_bp,   url_prefix="/customers")     
app.register_blueprint(sales_bp,       url_prefix="/sales")         

if __name__ == "__main__":
    app.run(debug=True)
