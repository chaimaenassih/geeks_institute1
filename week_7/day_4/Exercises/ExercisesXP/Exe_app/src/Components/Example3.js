import React from "react";
import data from "../complexData.json";

class Example3 extends React.Component {
  render() {
    return (
      <div className="card m-3 p-3">
        <h3>Example3 Component</h3>

        {data.Experiences.map((exp, index) => (
          <div key={index} className="mb-4">
          <div
              style={{
              width: "150px",
              height: "150px",
             borderRadius: "50%",
             border: "2px solid #ccc",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             textAlign: "center", 
             marginBottom: "10px",
          

  }}
>
  NO IMAGE AVAILABLE
</div>


            <a href={exp.url} target="_blank" rel="noreferrer">
              {exp.companyName}
            </a>
            <p>
              <strong>{exp.title}</strong>
            </p>
            <p>
              {exp.startDate} {exp.location}
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
