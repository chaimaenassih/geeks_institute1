import math
import turtle
from functools import total_ordering


@total_ordering
class Circle:
    def __init__(self, *, radius=None, diameter=None):
        # A circle must be defined by radius OR diameter
        if radius is None and diameter is None:
            raise ValueError("You must provide either radius or diameter.")
        if radius is not None and diameter is not None:
            raise ValueError("Provide only one: radius OR diameter.")

        if radius is not None:
            radius = float(radius)
            if radius < 0:
                raise ValueError("Radius must be non-negative.")
            self._radius = radius

        if diameter is not None:
            diameter = float(diameter)
            if diameter < 0:
                raise ValueError("Diameter must be non-negative.")
            self._radius = diameter / 2

    # --- Query radius / diameter ---
    @property
    def radius(self):
        return self._radius

    @property
    def diameter(self):
        return self._radius * 2

    # --- Compute area ---
    @property
    def area(self):
        return math.pi * (self._radius ** 2)

    # --- Print attributes (dunder) ---
    def __str__(self):
        return f"Circle(radius={self.radius}, diameter={self.diameter})"

    def __repr__(self):
        return f"Circle(radius={self.radius})"

    # --- Add two circles ---
    def __add__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return Circle(radius=self.radius + other.radius)

    # --- Compare circles ---
    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius < other.radius

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius == other.radius


# --------------------
# BONUS: Turtle drawing
# --------------------
def draw_sorted_circles(circles):
    screen = turtle.Screen()
    screen.title("Sorted Circles")

    t = turtle.Turtle()
    t.hideturtle()
    t.speed(0)
    t.pensize(2)

    x = -300
    y = 0

    for c in circles:
        r = c.radius

        t.penup()
        t.goto(x, y - r)
        t.pendown()
        t.circle(r)

        x += (2 * r) + 20  

    turtle.done()


# --------------------
# TESTS
# --------------------
if __name__ == "__main__":
    c1 = Circle(radius=3)
    c2 = Circle(diameter=10)  

    print("c1:", c1)
    print("c2:", c2)

    print("c1 radius:", c1.radius)
    print("c1 diameter:", c1.diameter)
    print("c1 area:", c1.area)

    c3 = c1 + c2
    print("c3 = c1 + c2:", c3)

    print("c1 > c2 ?", c1 > c2)
    print("c1 < c2 ?", c1 < c2)
    print("c1 == c2 ?", c1 == c2)

    circles = [
        c2,
        c1,
        c3,
        Circle(radius=1.5),
        Circle(diameter=6)
    ]

    print("Before sort:", circles)
    circles_sorted = sorted(circles)
    print("After sort :", circles_sorted)

    # BONUS 
    draw_sorted_circles(circles_sorted)
