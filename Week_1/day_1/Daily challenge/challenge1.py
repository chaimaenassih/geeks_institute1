# Challenge 1: Multiples Generator

number = int(input("Enter a number: "))
length = int(input("Enter the length: "))

multiples = [number * i for i in range(1, length + 1)]

print("Result:", multiples)


# Challenge 2: Remove Consecutive Duplicates

word = input("Enter a word: ")

result = word[0]  
for char in word[1:]:
    if char != result[-1]:
        result += char

print("Result:", result)


