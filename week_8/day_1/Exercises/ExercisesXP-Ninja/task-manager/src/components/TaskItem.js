import React from "react";
import { useTasks } from "../TaskContext";

export default function TaskItem({ task }) {
  const { dispatch } = useTasks();

  const toggleCompleted = () => {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  };

  const removeTask = () => {
    dispatch({ type: "REMOVE_TASK", payload: task.id });
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.25rem",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleCompleted}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          flex: 1,
        }}
      >
        {task.text}
      </span>
      <button onClick={removeTask}>Supprimer</button>
    </li>
  );
}
