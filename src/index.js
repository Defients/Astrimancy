// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";

// Create a root
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element 'root' was not found in the document");
}

const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker with improved error handling
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log(
        "ServiceWorker registration successful with scope: ",
        registration.scope
      );
    } catch (error) {
      console.log("ServiceWorker registration failed: ", error);
    }
  });
}
