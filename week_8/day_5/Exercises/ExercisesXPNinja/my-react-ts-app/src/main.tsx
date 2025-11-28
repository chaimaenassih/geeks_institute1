import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ContactProvider } from "./context/ContactContext";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </React.StrictMode>
);
