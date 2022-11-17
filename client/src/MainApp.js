import React from "react";
import App from "./App";
import jwtDecode from "jwt-decode";
import DashboardEmployer from "./DashboardEmployer";
import PersonDashboard from "./PersonDashboard";
import { useUser } from "./context/User";

function MainApp() {
  const { UserType } = useUser();

  console.log(UserType);

  const render = () => {
    if (UserType === "") return <App />;
    if (UserType === "Employer") return <DashboardEmployer />;
    if (UserType === "Employee") return <PersonDashboard />;
  };

  return <div>{render()}</div>;
}

export default MainApp;
