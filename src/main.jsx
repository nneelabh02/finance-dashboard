import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

// ✅ APPLY SAVED THEME BEFORE APP LOADS
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* Portal for toast notifications */}
    <Toaster position="top-right" reverseOrder={false} />
  </React.StrictMode>
);