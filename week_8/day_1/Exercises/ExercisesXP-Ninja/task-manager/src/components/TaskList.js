import React from "react";
import { useTasks } from "../TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return <p>Aucune tâche pour l’instant.</p>;
  }

  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
