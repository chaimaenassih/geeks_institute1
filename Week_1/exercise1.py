#Exercise 1 : Hello World
print('Hello world \n' * 4)

#Exercise 2 : Some Math

result = pow(99, 3) * 8
print(result)

# Exercise 3 : What’s your name ?

my_name = "chaimae" 
user_name = input("What's your name? ")

if user_name.strip().lower() == my_name.lower():
    print("Wow! We have the same name — are we secretly twins?")
else:
    print(f"Nice to meet you, {user_name}! But {my_name} is still cooler.")

# Exercise 4 : Tall enough to ride a roller coaster

height = int(input("Enter your height in cm: "))

if height > 145:
    print("You are tall enough to ride the roller coaster!")
else:
    print("Sorry, you need to grow some more to ride.")

#Exercise 5 : Favorite Numbers

my_fav_numbers = {3, 7, 15}  
my_fav_numbers.add(21)
my_fav_numbers.add(42)

my_fav_numbers.remove(42)

friend_fav_numbers = {5, 7, 12}

our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

print("My favorite numbers:", my_fav_numbers)
print("Friend's favorite numbers:", friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)

#Exercise 6: Tuple
# Tuples are immutable, so we cannot add elements directly. 
# But we can convert a tuple into a list, add the element, then convert it back to a tuple.

t = (1, 2, 3)
temp = list(t)     
temp.append(4)     
t = tuple(temp)    
print(t) 

#Exercise 7: List

basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove("Banana")

basket.remove("Blueberries")

basket.append("Kiwi")

basket.insert(0, "Apples")

apple_count = basket.count("Apples")
print("Number of Apples:", apple_count)

basket.clear()

print(basket)

# Exercise 8 : Sandwich Orders

sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", 
   "Pastrami sandwich", "Egg sandwich", "Chicken sandwich",  "Pastrami sandwich"]

while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")

finished_sandwiches = []

while sandwich_orders:
    current_sandwich = sandwich_orders.pop(0)  
    finished_sandwiches.append(current_sandwich)

for sandwich in finished_sandwiches:
    print(f"I made your {sandwich.lower()}")







