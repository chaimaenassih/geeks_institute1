import React from "react";
import { useTasks } from "../TaskContext";

export default function FilterButtons() {
  const { filter, dispatch } = useTasks();

  const setFilter = (value) => {
    dispatch({ type: "SET_FILTER", payload: value });
  };

  const btnClass = (value) =>
    "filter-btn" + (filter === value ? " filter-btn-active" : "");

  return (
    <div className="filters">
      <button onClick={() => setFilter("all")} className={btnClass("all")}>
        Toutes
      </button>
      <button
        onClick={() => setFilter("active")}
        className={btnClass("active")}
      >
        Actives
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={btnClass("completed")}
      >
        Terminées
      </button>
    </div>
  );
}
