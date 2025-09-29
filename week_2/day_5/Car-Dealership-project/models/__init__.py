# models/__init__.py
from .vehicles import vehicles_bp
from .sales import sales_bp
from .customers import customers_bp
from .salespeople import salespeople_bp

__all__ = ["vehicles_bp", "sales_bp", "customers_bp", "salespeople_bp"]
