// src/InfoCard.js
import React from "react";

function InfoCard({ title, iconClass, text, isStriped }) {
  return (
    <section
      className={
        "info-card text-center py-5 px-3 px-md-5" +
        (isStriped ? " info-card-striped" : "")
      }
    >
      <div className="info-icon mb-3">
        <i className={iconClass}></i>
      </div>
      <h2 className="info-title mb-3">{title}</h2>
      <p className="info-text mb-0">{text}</p>
    </section>
  );
}

export default InfoCard;
