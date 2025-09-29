#Exercise 1: What is the Season?
month = int(input("Enter the month number (1-12): "))
if month in [3, 4, 5]:
    print("Spring")
elif month in [6, 7, 8]:
    print("Summer")
elif month in [9, 10, 11]:
    print("Autumn")
elif month in [12, 1, 2]:
    print("Winter")
else:
    print("Invalid month number! Please enter between 1 and 12.")

#Exercise 2: For Loop
for i in range(1,21) :
 print(i)

 numbers = list(range(1, 21))
for i in range(0, len(numbers), 2):  
    print(numbers[i])

# Exercise 3: While Loop
my_name = "chaimae"   
while True:
    name = input("Enter your name: ")
    if name == my_name:
        print("Correct! Welcome,", my_name)
        break
    else:
        print("That's not my name. Try again.")

#Exercise 4: Check the index

names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

user_name = input("Enter a name: ")

if user_name in names:
    index = names.index(user_name) 
    print(f"{user_name} found at index {index}")
else:
    print(f"{user_name} is not in the list.")

#Exercise 5: Greatest Number

a = int(input("Input the 1st number: "))
b = int(input("Input the 2nd number: "))
c = int(input("Input the 3rd number: "))

greatest = max(a, b, c)

print(f"The greatest number is: {greatest}")

#Exercise 6: Random number
import random

wins = 0
losses = 0

while True:
    user_input = input("Enter a number between 1 and 9 (or 'quit' to stop): ")

    if user_input.lower() == "quit":
        break

    if not user_input.isdigit():
        print("Please enter a valid number!")
        continue

    user_guess = int(user_input)
    if user_guess < 1 or user_guess > 9:
        print("Number must be between 1 and 9!")
        continue

    random_num = random.randint(1, 9)

    if user_guess == random_num:
        print("Winner")
        wins += 1
    else:
        print(f"Better luck next time. The number was {random_num}")
        losses += 1
print("\nGame Over!")
print(f"Total Wins: {wins}")
print(f"Total Losses: {losses}")





