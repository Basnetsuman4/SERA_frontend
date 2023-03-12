import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router-dom";
import "./css/index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter
      getUserConfirmation={(message, callback) => {
        const allowTransition = window.confirm(message);
        callback(allowTransition);
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
