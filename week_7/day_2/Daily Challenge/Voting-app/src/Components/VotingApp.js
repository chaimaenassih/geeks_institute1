import React from "react";

function VotingApp({ languages, onVote }) {
  return (
    <div className="vote-container">
      <h2>Vote Your Language!</h2>

      {languages.map((lang, index) => (
        <div className="language-row" key={lang.name}>
          <span className="language-votes">{lang.votes}</span>
          <span className="language-name">{lang.name}</span>
          <button
            className="language-button"
            onClick={() => onVote(index)}
          >
            Click Here
          </button>
        </div>
      ))}
    </div>
  );
}

export default VotingApp;
