#Exercise 1 : Pets

class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'

all_cats = [
    Bengal("Milo", 3),
    Chartreux("Luna", 2),
    Siamese("Simba", 4)
]

sara_pets = Pets(all_cats)

sara_pets.walk()

#Exercise 2 : Dogs

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        self_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight
        if self_power > other_power:
            return f"{self.name} won the fight"
        elif self_power < other_power:
            return f"{other_dog.name} won the fight"
        else:
            return "It's a tie"

dog1 = Dog("Rex", 5, 20)
dog2 = Dog("Buddy", 3, 15)
dog3 = Dog("Max", 4, 25)

print(dog1.bark())  
print(dog2.run_speed()) 
print(dog3.run_speed()) 

print(dog1.fight(dog2))  
print(dog2.fight(dog3)) 
print(dog1.fight(dog3))  


#Exercise 3 : Dogs Domesticated

import random
class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained
    def train(self):
        print(self.bark())
        self.trained = True
    def play(self, *args):
        dog_names = ", ".join([dog.name for dog in args])
        print(f"{self.name}, {dog_names} all play together")
    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead"
            ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained yet!")

dog1 = PetDog("Rex", 5, 20)
dog2 = PetDog("Buddy", 3, 15)
dog3 = PetDog("Max", 4, 25)

dog1.train()
dog1.play(dog2, dog3)
dog1.do_a_trick() 
dog2.do_a_trick()  

#Exercise 4 : Family

class Family:
    def __init__(self, last_name, members):
        self.last_name = last_name
        self.members = members

    def born(self, **kwargs):
        self.members.append(kwargs)
        print(f"Congratulations to the {self.last_name} family for the new member {kwargs.get('name', '')}!")

    def is_18(self, name):
        for member in self.members:
            if member['name'] == name:
                return member['age'] >= 18
        return False

    def family_presentation(self):
        print(f"Family last name: {self.last_name}")
        print("Members:")
        for member in self.members:
            print(member)

members_list = [
    {'name':'Michael','age':35,'gender':'Male','is_child':False},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False}
]

my_family = Family("Johnson", members_list)

my_family.born(name="Emma", age=0, gender="Female", is_child=True)

print(my_family.is_18("Michael")) 
print(my_family.is_18("Emma"))     

my_family.family_presentation()

#Exercise 5 : TheIncredibles Family

class TheIncredibles(Family):
    def __init__(self, last_name, members):
        super().__init__(last_name, members)

    def use_power(self, name):
        for member in self.members:
            if member['name'] == name:
                if member['age'] >= 18:
                    print(f"{member['name']} uses their power: {member['power']}")
                else:
                    raise Exception(f"{member['name']} is not over 18 years old!")
                return
        print(f"No member named {name} found.")

    def incredible_presentation(self):
        print("Here is our powerful family **")
        super().family_presentation()

members_list = [
    {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
]

incredibles_family = TheIncredibles("Incredibles", members_list)

incredibles_family.incredible_presentation()

incredibles_family.born(name="Baby Jack", age=0, gender="Male", is_child=True, power="Unknown Power", incredible_name="BabyJack")

incredibles_family.incredible_presentation()

incredibles_family.use_power("Michael")
incredibles_family.use_power("Baby Jack") 

