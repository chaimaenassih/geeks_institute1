
# Part I: Bank Account

class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            print("Authentication successful!")
        else:
            raise Exception("Invalid username or password")

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to perform this action")
        if amount <= 0:
            raise Exception("Deposit must be positive")
        self.balance += amount
        print(f"Deposited {amount}. New balance = {self.balance}")

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to perform this action")
        if amount <= 0:
            raise Exception("Withdrawal must be positive")
        if amount > self.balance:
            raise Exception("Insufficient funds")
        self.balance -= amount
        print(f"Withdrew {amount}. New balance = {self.balance}")


# Part II: Minimum Balance Account
class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to perform this action")
        if amount <= 0:
            raise Exception("Withdrawal must be positive")
        if self.balance - amount < self.minimum_balance:
            raise Exception("Cannot withdraw, balance would go below minimum balance")
        self.balance -= amount
        print(f"Withdrew {amount}. New balance = {self.balance}")


# Part IV: ATM Class
class ATM:
    def __init__(self, account_list, try_limit=2):
        if not isinstance(account_list, list) or not all(isinstance(acc, BankAccount) for acc in account_list):
            raise Exception("account_list must be a list of BankAccount or MinimumBalanceAccount instances")

        if not isinstance(try_limit, int) or try_limit <= 0:
            print("Invalid try_limit, setting to default = 2")
            try_limit = 2

        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0

        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n=== ATM Main Menu ===")
            print("1. Log in")
            print("2. Exit")

            choice = input("Enter choice: ")
            if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Exiting... Goodbye!")
                break
            else:
                print("Invalid choice, try again.")

    def log_in(self, username, password):
        for account in self.account_list:
            try:
                account.authenticate(username, password)
                self.show_account_menu(account)
                return
            except:
                continue

        self.current_tries += 1
        print(f"Login failed. Attempt {self.current_tries}/{self.try_limit}")

        if self.current_tries >= self.try_limit:
            print("Max login attempts reached. Shutting down...")
            exit()

    def show_account_menu(self, account):
        while True:
            print("\n=== Account Menu ===")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit")

            choice = input("Enter choice: ")
            if choice == "1":
                amount = int(input("Enter deposit amount: "))
                account.deposit(amount)
            elif choice == "2":
                amount = int(input("Enter withdraw amount: "))
                account.withdraw(amount)
            elif choice == "3":
                print("Logging out...")
                break
            else:
                print("Invalid choice, try again.")


# Example usage
if __name__ == "__main__":
    acc1 = BankAccount("user1", "pass1", 100)
    acc2 = MinimumBalanceAccount("user2", "pass2", 500, minimum_balance=100)

    atm = ATM([acc1, acc2], try_limit=3)


