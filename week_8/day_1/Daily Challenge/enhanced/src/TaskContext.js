import React, { createContext, useContext, useReducer } from "react";

const TaskContext = createContext();

// --- État initial ---
const initialState = {
  tasks: [],
  filter: "all", // "all" | "active" | "completed"
};

// --- Reducer ---
function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = {
        id: Date.now(),
        text: action.payload,
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

    case "EDIT_TASK": {
      const { id, text } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, text } : task
        ),
      };
    }

    case "SET_FILTER": {
      return {
        ...state,
        filter: action.payload, // "all" | "active" | "completed"
      };
    }

    default:
      return state;
  }
}

// --- Provider ---
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const value = {
    tasks: state.tasks,
    filter: state.filter,
    dispatch,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  return useContext(TaskContext);
}
