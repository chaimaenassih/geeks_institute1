import React from "react";
import data from "../complexData.json";

class Example2 extends React.Component {
  render() {
    const skills = data.Skills;

    return (
      <div className="card m-3 p-3">
        <h3>Example2 Component</h3>

        <h5>Programming Language</h5>
        <ul>
          {skills.ProgrammingLanguage.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>

        <h5>Web-Based Application Development</h5>
        <ul>
          {skills.WebBasedApplicationDevelopment.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example2;
