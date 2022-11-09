import React from "react";
import App from "./App";
import jwtDecode from "jwt-decode";
import DashboardEmployer from "./DashboardEmployer";
import PersonDashboard from "./PersonDashboard";

function FinalApp() {
  const token = document.cookie;

  const render = () => {
    if (!token) {
      return <App />;
    } else if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.type === "person") {
        return <PersonDashboard />;
      } else {
        return <DashboardEmployer />;
      }
    }
  };

  return <div>{render()}</div>;
}

export default FinalApp;
