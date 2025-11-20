import React from "react";
import "./App.css";
import Car from "./Components/Car";
import Events from "./Components/Events";
import Phone from "./Components/Phone";
import Color from "./Components/Color";

const carinfo = { name: "Ford", model: "Mustang" };

function App() {
  return (
    <div className="App">
     
      <div className="exercise">
        <h2>Exercise 1 : Car & Garage</h2>
        <Car carinfo={carinfo} />
      </div>

      <div className="exercise">
        <h2>Exercise 2 : Events</h2>
        <Events />
      </div>

      <div className="exercise">
        <h2>Exercise 3 : Phone</h2>
        <Phone />
      </div>

      <div className="exercise">
        <h2>Exercise 4 : Color & useEffect</h2>
        <Color />
      </div>
    </div>
  );
}

export default App;
