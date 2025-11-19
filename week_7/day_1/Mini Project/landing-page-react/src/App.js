// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Header from "./Header";
import InfoCard from "./InfoCard";
import Contact from "./Contact";

const sections = [
  {
    title: "About the Company",
    iconClass: "fa-solid fa-building",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    title: "Our Values",
    iconClass: "fa-solid fa-earth-europe",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    title: "Our Mission",
    iconClass: "fa-solid fa-landmark",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
];

function App() {
  return (
    <div className="app-bg py-5">
      <div className="landing-card mx-auto">
        <Header />

        <main className="p-4 p-md-5">
          {/* Trois sections (cards) */}
          {sections.map((section, index) => (
            <InfoCard
              key={index}
              title={section.title}
              iconClass={section.iconClass}
              text={section.text}
              isStriped={index % 2 === 1}
            />
          ))}

          {/* Section Contact */}
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
