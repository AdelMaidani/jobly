import React from "react";
import Navbar from "./components/navbar";
import NavbarEmployer from "./components/NavbarEmployer";
import NavbarPerson from "./components/NavbarPerson";
import { useUser } from "./context/User";

function CustomNav() {
  const { UserType } = useUser();

  console.log(UserType);

  const render = () => {
    if (UserType === "") return <Navbar />;
    if (UserType === "Employer") return <NavbarEmployer />;
    if (UserType === "Employee") return <NavbarPerson />;
  };

  return <div>{render()}</div>;
}

export default CustomNav;
