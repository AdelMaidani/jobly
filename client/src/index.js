import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainApp from "./MainApp";
import UpdatedApp from "./UpdatedApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UpdatedApp />
    </BrowserRouter>
  </React.StrictMode>
);
