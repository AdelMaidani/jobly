import React, { useEffect } from "react";
import App from "./App";
import DashboardEmployer from "./DashboardEmployer";
import PersonDashboard from "./PersonDashboard";
import { useUser } from "./context/User";
import axios from "axios";

function MainApp() {
  const { setUser, UserType } = useUser();

  useEffect(() => {
    axios({
      method: "Get",
      withCredentials: true,
      url: "http://localhost:3000/userVerify",
    })
      .then((res) => {
        setUser(res.data.userType);
      })
      .catch((err) => console.log(err));
  });

  function render() {
    if (UserType === undefined) {
      return <App />;
    } else if (UserType === "Employer") {
      return <DashboardEmployer />;
    } else if (UserType === "person") {
      return <PersonDashboard />;
    }
  }

  return <div>{render()}</div>;
}

export default MainApp;
