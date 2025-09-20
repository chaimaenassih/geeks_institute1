import random

class Game:
    def get_user_item(self):
        """Demander à l'utilisateur de choisir r, p ou s"""
        while True:
            choice = input("Select (r)ock, (p)aper, or (s)cissors: ").lower()
            if choice in ['r', 'p', 's']:
                mapping = {'r': 'rock', 'p': 'paper', 's': 'scissors'}
                return mapping[choice]
            print("Invalid choice, please try again.")

    def get_computer_item(self):
        """Choix aléatoire de l'ordinateur"""
        return random.choice(['rock', 'paper', 'scissors'])

    def get_game_result(self, user_item, computer_item):
        """Déterminer le résultat"""
        if user_item == computer_item:
            return 'draw'
        elif (user_item == 'rock' and computer_item == 'scissors') or \
             (user_item == 'paper' and computer_item == 'rock') or \
             (user_item == 'scissors' and computer_item == 'paper'):
            return 'win'
        else:
            return 'loss'

    def play(self):
        """Jouer une manche"""
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)

        # affichage identique à la capture
        short_map = {'rock': 'r', 'paper': 'p', 'scissors': 's'}
        print(f"You chose: {short_map[user_item]}. The computer chose: {short_map[computer_item]}. Result: {result}")

        return result
