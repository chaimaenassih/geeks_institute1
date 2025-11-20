import React, { useState, useEffect } from "react";

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached");
  }, [favoriteColor]);

  const changeToBlue = () => {
    setFavoriteColor("blue");
  };

  return (
    <div>
      <h3>My favorite color is {favoriteColor}</h3>
      <button onClick={changeToBlue}>Change color to blue</button>
    </div>
  );
}

export default Color;
