import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import createRoot instead of render
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css"; // Ensure this file exists if using styles

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct way to create root in React 18
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
