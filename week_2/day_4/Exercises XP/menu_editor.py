# menu_editor.py
from __future__ import annotations
from menu_item import MenuItem
from menu_manager import MenuManager


def show_restaurant_menu():
    items = MenuManager.all_items()
    if not items:
        print("\n--- Restaurant Menu ---\n(Empty)\n")
        return
    print("\n--- Restaurant Menu ---")
    for it in items:
        print(f"[{it.item_id:>3}] {it.name:<30} {it.price:>5} MAD")
    print()


def add_item_to_menu():
    name = input("Item name: ").strip()
    price_str = input("Item price (integer): ").strip()
    if not name or not price_str.isdigit():
        print("❌ Invalid input.")
        return
    item = MenuItem(name, int(price_str))
    if item.save():
        print("✅ Item was added successfully.")
    else:
        print("❌ Error while adding item.")


def remove_item_from_menu():
    name = input("Item name to delete: ").strip()
    if not name:
        print("❌ Invalid input.")
        return
    item = MenuItem(name, 0)  # prix ignoré pour delete
    if item.delete():
        print("✅ Item was deleted successfully.")
    else:
        print("❌ Error: item not found or not deleted.")


def update_item_from_menu():
    name = input("Current item name: ").strip()
    if not name:
        print("❌ Invalid input.")
        return

    new_name = input("New name (leave blank to keep): ").strip()
    new_price_str = input("New price (leave blank to keep): ").strip()

    if not new_name and not new_price_str:
        print("❌ Nothing to update.")
        return

    new_price = None
    if new_price_str:
        if not new_price_str.isdigit():
            print("❌ Price must be an integer.")
            return
        new_price = int(new_price_str)

    item = MenuItem(name, 0)  # prix ignoré, on mettra à jour via SQL
    if item.update(new_name=new_name or None, new_price=new_price):
        print("✅ Item was updated successfully.")
    else:
        print("❌ Error while updating item.")


def show_user_menu():
    print("Welcome to Menu Manager!")
    while True:
        print(
            "\nChoose an option:\n"
            "(V) View an Item\n"
            "(A) Add an Item\n"
            "(D) Delete an Item\n"
            "(U) Update an Item\n"
            "(S) Show the Menu\n"
            "(E) Exit"
        )
        choice = input("Your choice: ").strip().upper()

        if choice == "V":
            name = input("Item name to view: ").strip()
            item = MenuManager.get_by_name(name)
            if item:
                print(f"Found: [{item.item_id}] {item.name} - {item.price} MAD")
            else:
                print("Not found.")
        elif choice == "A":
            add_item_to_menu()
        elif choice == "D":
            remove_item_from_menu()
        elif choice == "U":
            update_item_from_menu()
        elif choice == "S":
            show_restaurant_menu()
        elif choice == "E":
            # Afficher le menu avant de quitter (exigence)
            show_restaurant_menu()
            print("Goodbye!")
            break
        else:
            print("❌ Unknown choice. Please pick V/A/D/U/S/E.")


if __name__ == "__main__":
    show_user_menu()
