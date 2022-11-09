import React from "react";
import { Route, Routes } from "react-router-dom";
import NavbarPerson from "./components/NavbarPerson";
import Applications from "./pages/Person Dashboard/Applications";
import Profile from "./pages/Person Dashboard/Profile";
import Jobs from "./pages/Person Dashboard/Jobs";
import JobDescription from "./pages/Person Dashboard/JobDescription";
import CompanyProfile from "./pages/Person Dashboard/CompanyProfile";
import { PersonProvider } from "./context/personContext";

function PersonDashboard() {
  return (
    <PersonProvider>
      <NavbarPerson />
      <Routes>
        <Route path="/applications" element={<Applications />} />
        <Route path="/person-jobs" element={<Jobs />} />
        <Route path="/" element={<Profile />} />
        <Route path="/job/:id" element={<JobDescription />} />
        <Route path="/company/:id" element={<CompanyProfile />} />
      </Routes>
    </PersonProvider>
  );
}

export default PersonDashboard;
