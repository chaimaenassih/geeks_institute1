import React, { useState } from "react";

function Events() {

  // Part I
  const clickMe = () => {
    alert("I was clicked");
  };

  // Part II
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert(`The Enter key was pressed, your input is: ${event.target.value}`);
    }
  };

  // Part III
  const [isToggleOn, setIsToggleOn] = useState(true);

  const handleToggle = () => {
    setIsToggleOn(prev => !prev);
  };

  return (
    <div>

      {/* Part I */}
      <button onClick={clickMe}>Click me</button>

      <br /><br />

      {/* Part II */}
      <input
        type="text"
        placeholder="Press the ENTER key!"
        onKeyDown={handleKeyDown}
      />

      <br /><br />

      {/* Part III */}
      <button onClick={handleToggle}>
        {isToggleOn ? "ON" : "OFF"}
      </button>

    </div>
  );
}

export default Events;
