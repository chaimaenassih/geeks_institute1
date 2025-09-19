#Exercise 1 : Call History

class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        call_record = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_record)
        self.call_history.append(call_record)

    def show_call_history(self):
        print(f"Call history for {self.phone_number}:")
        for call in self.call_history:
            print(call)

    def send_message(self, other_phone, content):
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}: {content}")
        self.messages.append(message)
        other_phone.messages.append(message)  

    def show_outgoing_messages(self):
        print(f"Outgoing messages from {self.phone_number}:")
        for msg in self.messages:
            if msg["from"] == self.phone_number:
                print(f"To {msg['to']}: {msg['content']}")

    def show_incoming_messages(self):
        print(f"Incoming messages to {self.phone_number}:")
        for msg in self.messages:
            if msg["to"] == self.phone_number:
                print(f"From {msg['from']}: {msg['content']}")

    def show_messages_from(self, sender_phone):
        print(f"Messages from {sender_phone.phone_number} to {self.phone_number}:")
        for msg in self.messages:
            if msg["from"] == sender_phone.phone_number and msg["to"] == self.phone_number:
                print(f"{msg['content']}")

phone1 = Phone("123-456-789")
phone2 = Phone("987-654-321")
phone3 = Phone("555-555-555")

phone1.call(phone2)
phone2.call(phone3)
phone3.call(phone1)

phone1.show_call_history()
phone2.show_call_history()
phone3.show_call_history()

phone1.send_message(phone2, "Hello, how are you?")
phone2.send_message(phone1, "I am fine, thanks!")
phone3.send_message(phone1, "Hey, are you available?")

phone1.show_outgoing_messages()
phone1.show_incoming_messages()
phone1.show_messages_from(phone2)
