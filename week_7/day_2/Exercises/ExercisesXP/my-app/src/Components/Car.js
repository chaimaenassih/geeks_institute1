import React, { useState } from "react";
import Garage from "./Garage";

function Car({ carinfo }) {
  const [color] = useState("red");

  return (
    <div>
      <h3>
        This car is a {color} {carinfo.model}
      </h3>
      <Garage size="small" />
    </div>
  );
}

export default Car;
