# Exercise 1: Cars

cars_string = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
cars_list = [car.strip() for car in cars_string.split(",")]
print("Cars list:", cars_list)

print("Number of manufacturers:", len(cars_list))

cars_descending = sorted(cars_list, reverse=True)
print("Manufacturers in descending order:", cars_descending)

count_with_o = sum(1 for car in cars_list if 'o' in car.lower())
count_without_i = sum(1 for car in cars_list if 'i' not in car.lower())
print("Number of manufacturers with 'o':", count_with_o)
print("Number of manufacturers without 'i':", count_without_i)

cars_with_duplicates = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
cars_no_duplicates = list(set(cars_with_duplicates))
print("Companies without duplicates:", ", ".join(cars_no_duplicates))
print("Number of companies now:", len(cars_no_duplicates))

cars_reversed = [car[::-1] for car in sorted(cars_no_duplicates)]
print("Reversed letters in ascending order:", cars_reversed)

# Exercise 2: What's your name?

def get_full_name(first_name, last_name, middle_name=""):
    """Return full name with optional middle name."""
    if middle_name:
        full_name = f"{first_name.title()} {middle_name.title()} {last_name.title()}"
    else:
        full_name = f"{first_name.title()} {last_name.title()}"
    return full_name

print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))

# Exercise 3: English to Morse

morse_dict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
}

def english_to_morse(text):
    return ' '.join(morse_dict.get(char.upper(), '') for char in text)

inverse_morse_dict = {v: k for k, v in morse_dict.items()}
def morse_to_english(morse_code):
    words = morse_code.split(' / ')
    decoded_words = []
    for word in words:
        letters = word.split()
        decoded_word = ''.join(inverse_morse_dict.get(letter, '') for letter in letters)
        decoded_words.append(decoded_word)
    return ' '.join(decoded_words)

text = "Hello World"
morse = english_to_morse(text)
print("English to Morse:", morse)
print("Morse to English:", morse_to_english(morse))
