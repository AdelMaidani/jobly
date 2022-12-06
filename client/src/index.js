import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainApp from "./MainApp";
import { UserProvide } from "./context/User";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvide>
        <MainApp />
      </UserProvide>
    </BrowserRouter>
  </StrictMode>
);
