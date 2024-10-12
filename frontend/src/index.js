import React from "react";
import ReactDOM from "react-dom/client"; // React 18'de bu şekilde import ediliyor
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // createRoot kullanarak root oluştur
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
