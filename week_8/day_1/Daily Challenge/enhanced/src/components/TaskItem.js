import React, { useState, useRef, useEffect } from "react";
import { useTasks } from "../TaskContext";

export default function TaskItem({ task }) {
  const { dispatch } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const toggleCompleted = () => {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  };

  const removeTask = () => {
    dispatch({ type: "REMOVE_TASK", payload: task.id });
  };

  const startEditing = () => {
    setEditText(task.text);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    dispatch({ type: "EDIT_TASK", payload: { id: task.id, text: trimmed } });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEditing();
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleCompleted}
        disabled={isEditing}
      />

      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="task-edit-input"
          />
          <div className="task-actions">
            <button className="btn btn-secondary" onClick={saveEdit}>
              Sauvegarder
            </button>
            <button className="btn btn-secondary" onClick={cancelEditing}>
              Annuler
            </button>
          </div>
        </>
      ) : (
        <>
          <span
            className={
              "task-text" +
              (task.completed ? " task-text-completed" : "")
            }
            onClick={startEditing}
          >
            {task.text}
          </span>
          <div className="task-actions">
            <button className="btn btn-secondary" onClick={startEditing}>
              Modifier
            </button>
            <button className="btn btn-secondary" onClick={removeTask}>
              Supprimer
            </button>
          </div>
        </>
      )}
    </li>
  );
}
