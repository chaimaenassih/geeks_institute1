import React, { useState } from "react";
import { useTasks } from "../TaskContext";

export default function AddTaskForm() {
  const { dispatch } = useTasks();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({ type: "ADD_TASK", payload: trimmed });
    setText(""); // reset input
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
