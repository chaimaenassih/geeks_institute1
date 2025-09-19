#Exercise 1 : Geometry
import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius

    def area(self):
        return math.pi * (self.radius ** 2)

    def definition(self):
        print("A circle is a shape with all points equidistant from its center.")
        
c = Circle(5)
print("Perimeter:", c.perimeter())
print("Area:", c.area())
c.definition()

#Exercise 2 : Custom List Class

import random

class MyList:
    def __init__(self, letters):
        self.letters = letters

    def reversed_list(self):
        return self.letters[::-1]

    def sorted_list(self):
        return sorted(self.letters)

    def random_list(self):
        return [random.randint(1, 100) for _ in range(len(self.letters))]

mylist = MyList(['d', 'a', 'c', 'b'])
print("Original List:", mylist.letters)
print("Reversed List:", mylist.reversed_list())
print("Sorted List:", mylist.sorted_list())
print("Random List:", mylist.random_list())

#Exercise 3 : Restaurant Menu Manager

class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True},
        ]

    def add_item(self, name, price, spice, gluten):
        self.menu.append({"name": name, "price": price, "spice": spice, "gluten": gluten})
        print(f"{name} has been added to the menu.")

    def update_item(self, name, price, spice, gluten):
        for dish in self.menu:
            if dish["name"] == name:
                dish.update({"price": price, "spice": spice, "gluten": gluten})
                print(f"{name} has been updated.")
                return
        print(f"{name} is not in the menu.")

    def remove_item(self, name):
        for dish in self.menu:
            if dish["name"] == name:
                self.menu.remove(dish)
                print(f"{name} has been removed.")
                print("Updated Menu:", self.menu)
                return
        print(f"{name} is not in the menu.")

if __name__ == "__main__":
    manager = MenuManager()
    manager.add_item("Pizza", 20, "A", True)
    manager.update_item("Soup", 12, "C", False)
    manager.remove_item("Hamburger")
    manager.remove_item("Sushi")  

