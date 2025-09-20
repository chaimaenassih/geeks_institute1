from datetime import datetime
birthdate_str = input("Entrez votre date de naissance (JJ/MM/AAAA): ")
birthdate = datetime.strptime(birthdate_str, "%d/%m/%Y")

today = datetime.today()
age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))

candles = age % 10

candle_str = "i" * candles if candles > 0 else " "

def print_cake(candles):
    print(f"       ___{candle_str}___")
    print("      |:H:a:p:p:y:|")
    print("    __|___________|__")
    print("   |^^^^^^^^^^^^^^^^^|")
    print("   |:B:i:r:t:h:d:a:y:|")
    print("   |                 |")
    print("   ~~~~~~~~~~~~~~~~~~~")

print("\nHappy Birthday!")
print_cake(candles)

year = birthdate.year
is_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

if is_leap:
    print("\nComme vous êtes né(e) une année bissextile, vous avez droit à deux gâteaux !")
    print_cake(candles)
