import React from "react";
import { Route, Routes } from "react-router-dom";
import JobDescription from "./pages/Employer Dashboard/JobDescription";
import NavbarEmployer from "./components/NavbarEmployer";
import ApplicantProfile from "./pages/Employer Dashboard/ApplicantProfile";
import Applicants from "./pages/Employer Dashboard/Applicants";
import Applications from "./pages/Employer Dashboard/Applications";
import ListaJob from "./pages/Employer Dashboard/List-a-job";
import Profile from "./pages/Employer Dashboard/Profile";
import { CompanyProvider } from "./context/companyContext";

function DashboardEmployer() {
  return (
    <div>
      <CompanyProvider>
        <NavbarEmployer />
        <Routes>
          <Route path="/application" element={<Applications />} />
          <Route path="/listajob" element={<ListaJob />} />
          <Route path="/" element={<Profile />} />
          <Route
            path="/applicant/:jobId/:personId"
            element={<ApplicantProfile />}
          />
          <Route path="/job/:id" element={<JobDescription />} />
          <Route path="/job/applicants/:id" element={<Applicants />} />
        </Routes>
      </CompanyProvider>
    </div>
  );
}

export default DashboardEmployer;
