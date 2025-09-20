from game import Game

def get_user_menu_choice():
    """Afficher le menu et récupérer le choix de l'utilisateur"""
    print("\nMenu:")
    print("(g) Play a new game")
    print("(x) Show scores and exit")
    choice = input(": ").lower()
    while choice not in ['g', 'x']:
        print("Invalid choice, please select 'g' or 'x'.")
        choice = input(": ").lower()
    return choice

def print_results(results):
    """Afficher le résumé final"""
    print("\nGame Results:")
    print(f"You won {results.get('win', 0)} times")
    print(f"You lost {results.get('loss', 0)} times")
    print(f"You drew {results.get('draw', 0)} times")
    print("\nThank you for playing!")

def main():
    results = {'win': 0, 'loss': 0, 'draw': 0}

    while True:
        choice = get_user_menu_choice()
        if choice == 'x':
            print_results(results)
            break
        elif choice == 'g':
            game = Game()
            result = game.play()
            results[result] += 1

if __name__ == "__main__":
    main()
