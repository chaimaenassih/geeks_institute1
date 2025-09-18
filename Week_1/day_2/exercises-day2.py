#Exercise 1 : Convert lists into dictionaries

keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

my_dict = dict(zip(keys, values))

print(my_dict)

#Exercise 2 : Cinemax #2
family = {}  
total_cost = 0

n = int(input("Combien de personnes dans la famille ? "))

for i in range(n):
    name = input(f"Entrez le nom de la personne {i+1} : ")
    age = int(input(f"Entrez l'âge de {name} : "))
    family[name] = age

print("\n--- Résultats ---")

for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    
    print(f"{name.capitalize()} doit payer {price}$")
    total_cost += price

print(f"\nLe coût total pour la famille est : {total_cost}$")

#Exercise 3: Zara

brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

brand["number_stores"] = 2

print(f"Zara habille les {', '.join(brand['type_of_clothes'])}.")

brand["country_creation"] = "Spain"

if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

del brand["creation_date"]

print("Dernier concurrent :", brand["international_competitors"][-1])

print("Couleurs principales aux US :", brand["major_color"]["US"])

print("Nombre de clés dans le dictionnaire :", len(brand))

print("Clés du dictionnaire :", brand.keys())

more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}

brand.update(more_on_zara)

print("Nombre de magasins après mise à jour :", brand["number_stores"])

#Exercise 4 : Some Geography

def describe_city(city, country="Morocco"):
    print(f"{city} is in {country}")

describe_city("Reykjavik", "Iceland")
describe_city("Paris", "France")
describe_city("Casablanca") 

#Exercise 5 : Random '
import random  

def compare_numbers(user_number):
    
    random_number = random.randint(1, 100)
    
    if user_number == random_number:
        print("Bravo ! Vous avez trouvé le bon nombre !")
    else:
        print("Dommage ! Ce n'est pas le même nombre.")
        print(f"Votre nombre : {user_number}")
        print(f"Nombre aléatoire : {random_number}")
compare_numbers(42) 
#Exercise 6 : Let’s create some personalized shirts !

def make_shirt(size="large", message="I love Python"):
    print(f"The size of the shirt is {size} and the text is '{message}'")

make_shirt()

make_shirt(size="medium")

make_shirt(size="small", message="Coding is fun!")

make_shirt(message="Python rocks!", size="extra large")

#Exercise 7 : Temperature Advice
import random

def get_random_temp(season):
   
    if season.lower() == "winter":
        low, high = -10, 16
    elif season.lower() == "spring":
        low, high = 0, 23
    elif season.lower() == "summer":
        low, high = 16, 40
    elif season.lower() in ["autumn", "fall"]:
        low, high = 0, 32
    else:
        low, high = -10, 40  

    temp = round(random.uniform(low, high), 1)
    return temp

def main():
    
    month = int(input("Enter the month number (1-12): "))

    if month in [12, 1, 2]:
        season = "winter"
    elif month in [3, 4, 5]:
        season = "spring"
    elif month in [6, 7, 8]:
        season = "summer"
    else:  
        season = "autumn"
    temperature = get_random_temp(season)
    print(f"The temperature right now is {temperature}°C.")

    if temperature < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temperature <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 < temperature <= 23:
        print("A bit cool! A light jacket should be fine.")
    elif 23 < temperature <= 32:
        print("Warm! Perfect weather for a t-shirt.")
    else:  
        print("Hot! Stay hydrated and wear light clothes.")

main()
#Exercise 8 : Star Wars Quiz
data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]

def ask_questions():
    correct = 0
    incorrect = 0
    wrong_answers = []  
    for item in data:
        user_answer = input(item["question"] + " ")
        if user_answer.strip().lower() == item["answer"].lower():
            print("Correct!")
            correct += 1
        else:
            print("Incorrect!")
            incorrect += 1
            wrong_answers.append({
                "question": item["question"],
                "your_answer": user_answer,
                "correct_answer": item["answer"]
            })

    return correct, incorrect, wrong_answers

def show_results(correct, incorrect, wrong_answers):
    print("\nQuiz finished!")
    print(f"Correct answers: {correct}")
    print(f"Incorrect answers: {incorrect}")

    if wrong_answers:
        print("\nHere are the questions you answered wrong:")
        for item in wrong_answers:
            print(f"Q: {item['question']}")
            print(f"Your answer: {item['your_answer']}")
            print(f"Correct answer: {item['correct_answer']}\n")

    if incorrect > 3:
        replay = input("You had more than 3 wrong answers. Do you want to play again? (yes/no) ")
        if replay.strip().lower() == "yes":
            main()
def main():
    correct, incorrect, wrong_answers = ask_questions()
    show_results(correct, incorrect, wrong_answers)

main()



