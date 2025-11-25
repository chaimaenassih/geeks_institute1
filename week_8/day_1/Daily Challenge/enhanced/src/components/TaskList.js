import React from "react";
import { useTasks } from "../TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, filter } = useTasks();

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (visibleTasks.length === 0) {
    return <p>Aucune tâche à afficher.</p>;
  }

  return (
    <ul className="task-list">
      {visibleTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
