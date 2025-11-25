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
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn">
        Ajouter
      </button>
    </form>
  );
}
