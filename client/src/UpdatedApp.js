import React from "react";
import CustomNav from "./CustomNav";
import { Route, Routes } from "react-router-dom";
import EmployeeApplications from "./pages/Person Dashboard/Applications";
import EmployeeProfile from "./pages/Person Dashboard/Profile";
import EmployeeJobs from "./pages/Person Dashboard/Jobs";
import EmployeeJobDescription from "./pages/Person Dashboard/JobDescription";
import CompanyProfile from "./pages/Person Dashboard/CompanyProfile";
import EmployerJobDescription from "./pages/Employer Dashboard/JobDescription";
import ApplicantProfile from "./pages/Employer Dashboard/ApplicantProfile";
import Applicants from "./pages/Employer Dashboard/Applicants";
import EmployerApplications from "./pages/Employer Dashboard/Applications";
import ListaJob from "./pages/Employer Dashboard/List-a-job";
import EmployerProfile from "./pages/Employer Dashboard/Profile";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import HomePage from "./pages/HomePage";
import CompanyProfile from "./pages/CompanyProfile";
import JobDescription from "./pages/JobDescription";
import CompanySignUp from "./pages/CompanySignUp";
import EmployeeSignUp from "./pages/EmployeeSignUp";
import CompanyLogin from "./pages/CompanyLogin";
import EmployeeLogin from "./pages/EmployeeLogin";

import {
  Home,
  EmployeeDashboard,
  EmployerDashboard,
} from "./context/PrivateRoutes";
import { UserProvide } from "./context/User";

function UpdatedApp() {
  return (
    <div>
      <UserProvide>
        <CustomNav />
        <Routes>
          {/* Home */}
          <Routes>
            <Route element={<Home />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/company/:id" element={<CompanyProfile />} />
              <Route path="/job/:id" element={<JobDescription />} />
              <Route path="/companySignup" element={<CompanySignUp />} />
              <Route path="/employeeSignup" element={<EmployeeSignUp />} />
              <Route path="/employeeLogin" element={<EmployeeLogin />} />
              <Route path="/companyLogin" element={<CompanyLogin />} />
            </Route>
          </Routes>

          {/* Person Dashboard */}
          <Routes>
            <Route element={<EmployeeDashboard />}>
              <Route path="/" element={<EmployeeProfile />} />
              <Route path="/applications" element={<EmployeeApplications />} />
              <Route path="/person-jobs" element={<EmployeeJobs />} />
              <Route path="/job/:id" element={<EmployeeJobDescription />} />
              <Route path="/company/:id" element={<CompanyProfile />} />
            </Route>
          </Routes>

          {/* Company Dashboard */}
          <Routes>
            <Route element={<EmployerDashboard />}>
              <Route path="/" element={<EmployerProfile />} />
              <Route path="/application" element={<EmployerApplications />} />
              <Route path="/listajob" element={<ListaJob />} />
              <Route
                path="/applicant/:jobId/:personId"
                element={<ApplicantProfile />}
              />
              <Route path="/job/:id" element={<EmployerJobDescription />} />
              <Route path="/job/applicants/:id" element={<Applicants />} />
            </Route>
          </Routes>
        </Routes>
      </UserProvide>
    </div>
  );
}

export default UpdatedApp;
