import React from "react";
import "./App.css";
import Exercise1Form from "./Components/Exercise1Form";
import Exercise2UserForm from "./Components/Exercise2UserForm";

function App() {
  return (
    <div className="App">
      
      <div className="exercise">
        <h2>Exercise 1 : Use data from a Form</h2>
        <Exercise1Form />
      </div>

      <div className="exercise">
        <h2>Exercise 2 : Display the user input from a Form</h2>
        <Exercise2UserForm />
      </div>
    </div>
  );
}

export default App;
