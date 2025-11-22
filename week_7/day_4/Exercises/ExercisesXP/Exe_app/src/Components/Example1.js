import React from "react";
import data from "../complexData.json";

class Example1 extends React.Component {
  render() {
    return (
      <div className="card m-3 p-3">
        <h3>Example1 Component</h3>
        <ul>
          {data.SocialMedias.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example1;
