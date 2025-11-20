import React from "react";
import "./App.css";
import Clock from "./Components/Clock";
import Form from "./Components/Form";

function App() {
  return (
    <div className="App">
      <h1>Exercises XP NINJA</h1>

      <div className="exercise">
        <h3>Exercise 1 : Local Time Live Clock with React</h3>
        <Clock />
      </div>

     <br>
     </br>

      <div className="exercise">
        <h3>Exercise 2 : Form Validation</h3>
        <Form />
      </div>
    </div>
  );
}

export default App;
