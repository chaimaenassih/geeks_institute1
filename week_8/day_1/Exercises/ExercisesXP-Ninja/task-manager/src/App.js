import React from "react";
import { TaskProvider } from "./TaskContext";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import './App.css';

export default function App() {
  return (
    <TaskProvider>
      <div style={{ padding: "2rem", maxWidth: "500px" }}>
        <h1>Task Manager</h1>
        <AddTaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
