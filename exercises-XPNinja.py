#Exercise 1 : Outputs

print(3 <= 3 < 9)             
print(3 == 3 == 3)           
print(bool(0))                 
print(bool(5 == "5"))          
print(bool(4 == 4) == bool("4" == "4")) 
print(bool(bool(None)))        

x = (1 == True)
y = (1 == False)
a = True + 4
b = False + 10

print("x is", x)   
print("y is", y)   
print("a:", a)     
print("b:", b)     


    
#Exercise 2 : Longest word without a specific character

longest_sentence = "" 

while True:
    sentence = input("Enter a sentence without the letter 'A' (or type 'quit' to stop): ")
    

    if sentence.lower() == "quit":
        print("Exiting the program. Goodbye!")
        break
    
    if "a" in sentence.lower():
        print("Oops! Your sentence contains the letter 'A'. Try again.")
        continue
    
    if len(sentence) > len(longest_sentence):
        longest_sentence = sentence
        print("Congratulations! This is the new longest sentence without 'A'.")
    else:
        print("Good attempt! But it's not longer than the current longest sentence.")
    
    print("Current longest sentence:", longest_sentence)



    #Exercise 3: Working on a paragraph
    import string

paragraph = """
Be grateful for what you have now. As you begin to think about all the things in your life you are grateful for, 
you will be amazed at the never-ending thoughts that come back to you of more things to be grateful for. 
You have to make a start, and then the law of attraction will receive those grateful thoughts and give you more just like them.
"""
clean_paragraph = paragraph.translate(str.maketrans("", "", string.punctuation))

num_chars = len(paragraph)

words = clean_paragraph.split()
num_words = len(words)

num_sentences = paragraph.count('.') + paragraph.count('!') + paragraph.count('?')

unique_words = set(words)
num_unique_words = len(unique_words)

num_non_whitespace_chars = sum(1 for char in paragraph if char not in string.whitespace)

avg_words_per_sentence = num_words / num_sentences if num_sentences > 0 else 0

num_non_unique_words = num_words - num_unique_words

print("Paragraphe analysé :\n", paragraph)
print("\n Statistiques :")
print(f"Nombre de caractères : {num_chars}")
print(f"Nombre de phrases : {num_sentences}")
print(f"Nombre de mots : {num_words}")
print(f"Nombre de mots uniques : {num_unique_words}")
print(f"Nombre de caractères non blancs : {num_non_whitespace_chars}")
print(f"Moyenne de mots par phrase : {avg_words_per_sentence:.2f}")
print(f"Nombre de mots non uniques : {num_non_unique_words}")

