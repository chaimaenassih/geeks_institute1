
import React from "react";
import { TaskProvider } from "./TaskContext";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import './App.css';

export default function App() {
  return (
    <TaskProvider>
      <div className="app">
        <div className="task-manager">
          <h1>Task Manager</h1>
          <AddTaskForm />
          <FilterButtons />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}
