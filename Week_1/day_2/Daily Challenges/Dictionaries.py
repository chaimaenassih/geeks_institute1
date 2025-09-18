# Challenge: Index Dictionary

word = input("Entrez un mot : ")

letter_indexes = {}

for index, letter in enumerate(word):
    if letter in letter_indexes:
        letter_indexes[letter].append(index)
    else:
        
        letter_indexes[letter] = [index]

print("Dictionnaire des lettres et indices :", letter_indexes)
