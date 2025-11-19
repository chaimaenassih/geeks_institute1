import React from "react";

function PlanetsList({ planets }) {
  return (
    <ul className="list-group m-5" style={{ width: "18rem" }}>
      {planets.map((planet, index) => (
        <li className="list-group-item" key={index}>
          {planet}
        </li>
      ))}
    </ul>
  );
}

export default PlanetsList;
