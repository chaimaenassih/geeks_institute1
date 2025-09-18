# Exercise 1: Birthday Look-up

birthdays = {
    "Alice": "1990/05/10",
    "Bob": "1988/11/23",
    "Charlie": "1995/02/14",
    "David": "1992/08/30",
    "Eve": "1991/12/05"
}

print("Welcome! You can look up the birthdays of the people in the list!")

name = input("Enter a person's name: ")

if name in birthdays:
    print(f"{name}'s birthday is {birthdays[name]}")
else:
    print(f"Sorry, we don’t have the birthday information for {name}")

# Exercise 2: Birthdays Advanced

print("\nAvailable names in the birthday list:")
for person in birthdays:
    print(person)

name = input("Enter a person's name: ")

if name in birthdays:
    print(f"{name}'s birthday is {birthdays[name]}")
else:
    print(f"Sorry, we don’t have the birthday information for {name}")

# Exercise 3: Sum

def sum_sequence(X):
    
    X1 = str(X)
    X2 = X1 * 2
    X3 = X1 * 3
    X4 = X1 * 4
    
    total = int(X1) + int(X2) + int(X3) + int(X4)
    return total

num = int(input("\nEnter a number for sum sequence: "))
print(f"Result of X + XX + XXX + XXXX = {sum_sequence(num)}")

# Exercise 4: Double Dice

import random

def throw_dice():
    return random.randint(1, 6)

def throw_until_doubles():
    count = 0
    while True:
        die1 = throw_dice()
        die2 = throw_dice()
        count += 1
        if die1 == die2:
            break
    return count

def main():
    results = []
    for _ in range(100):  
        throws = throw_until_doubles()
        results.append(throws)

    total_throws = sum(results)
    average_throws = round(total_throws / len(results), 2)

    print(f"\nTotal throws to reach 100 doubles: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws}")

main()
