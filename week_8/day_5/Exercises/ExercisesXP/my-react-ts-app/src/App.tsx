import Greeting from "./components/Greeting";
import Counter from "./components/Counter";
import UserCard from "./components/UserCard";
import UserList from "./components/UserList";
import './App.css'

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Exercise 2: Greeting</h2>
      <Greeting name="Ali" messageCount={4} />

      <h2>Exercise 3: Counter</h2>
      <Counter />

      <h2>Exercise 4: UserCard</h2>
      <UserCard name="Youssef" age={24} role="Admin" />
      <UserCard age={30} />
      <UserCard />

      <h2>Exercise 5: UserList</h2>
      <UserList />
    </div>
  );
}

export default App;
