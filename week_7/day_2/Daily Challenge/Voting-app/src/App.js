import React, { useState } from "react";
import "./App.css";
import VotingApp from "./Components/VotingApp";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaSript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const handleVote = (index) => {
    setLanguages((prevLanguages) =>
      prevLanguages.map((lang, i) =>
        i === index ? { ...lang, votes: lang.votes + 1 } : lang
      )
    );
  };

  return (
    <div className="App">
      
      <div className="exercise">
        <VotingApp languages={languages} onVote={handleVote} />
      </div>
    </div>
  );
}

export default App;
