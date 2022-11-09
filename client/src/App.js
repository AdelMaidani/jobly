import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import HomePage from "./pages/HomePage";
import CompanyProfile from "./pages/CompanyProfile";
import JobDescription from "./pages/JobDescription";
import CompanySignUp from "./pages/CompanySignUp";
import EmployeeSignUp from "./pages/EmployeeSignUp";
import CompanyLogin from "./pages/CompanyLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-poppins h-screen m-0 flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/:id" element={<CompanyProfile />} />
        <Route path="/job/:id" element={<JobDescription />} />
        <Route path="/companySignup" element={<CompanySignUp />} />
        <Route path="/employeeSignup" element={<EmployeeSignUp />} />
        <Route path="/employeeLogin" element={<EmployeeLogin />} />
        <Route path="/companyLogin" element={<CompanyLogin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
