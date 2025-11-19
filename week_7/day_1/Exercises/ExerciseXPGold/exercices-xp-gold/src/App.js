import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BootstrapCard from "./BootstrapCard";
import PlanetsList from "./PlanetsList";

const celebrities = [
  {
    title: "Bob Dylan",
    imageUrl:
      "https://miro.medium.com/max/4800/1*_EDEWvWLREzlAvaQRfC_SQ.jpeg",
    buttonLabel: "Go to Wikipedia",
    buttonUrl: "https://en.wikipedia.org/wiki/Bob_Dylan",
    description:
      "Bob Dylan is an American singer-songwriter, author and artist who has been an influential figure in popular music and culture for more than five decades.",
  },
  {
    title: "McCartney",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Paul_McCartney_in_October_2018.jpg/240px-Paul_McCartney_in_October_2018.jpg",
    buttonLabel: "Go to Wikipedia",
    buttonUrl: "https://en.wikipedia.org/wiki/Paul_McCartney",
    description:
      "Paul McCartney is an English singer, songwriter, musician and producer who gained worldwide fame as co-lead vocalist and bassist for the Beatles.",
  },
];

const planets = ["Mars", "Venus", "Jupiter", "Earth", "Saturn", "Neptune"];

function App() {
  return (
    <div className="container my-5">
      {/* Cartes Bootstrap */}
      <div className="d-flex flex-wrap justify-content-center">
        <BootstrapCard
          title={celebrities[0].title}
          imageUrl={celebrities[0].imageUrl}
          buttonLabel={celebrities[0].buttonLabel}
          buttonUrl={celebrities[0].buttonUrl}
          description={celebrities[0].description}
        />
        <BootstrapCard
          title={celebrities[1].title}
          imageUrl={celebrities[1].imageUrl}
          buttonLabel={celebrities[1].buttonLabel}
          buttonUrl={celebrities[1].buttonUrl}
          description={celebrities[1].description}
        />
      </div>

      {/* Liste des planètes */}
      <div className="d-flex justify-content-center">
        <PlanetsList planets={planets} />
      </div>
    </div>
  );
}

export default App;
