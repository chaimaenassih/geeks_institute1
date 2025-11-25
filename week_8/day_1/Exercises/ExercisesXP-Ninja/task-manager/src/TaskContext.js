import React, { createContext, useContext, useReducer } from "react";

// --- 1. Création du contexte ---
const TaskContext = createContext();

// --- 2. État initial ---
const initialState = {
  tasks: [],
};

// --- 3. Reducer pour gérer les actions sur les tâches ---
function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = {
        id: Date.now(),        // id unique simple
        text: action.payload,  // le texte de la tâche
        completed: false,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }

    case "TOGGLE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    }

    case "REMOVE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    }

    default:
      return state;
  }
}

// --- 4. Provider qui encapsule l'appli ---
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const value = {
    tasks: state.tasks,
    dispatch,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// --- 5. Hook pratique pour utiliser le contexte ---
export function useTasks() {
  return useContext(TaskContext);
}
