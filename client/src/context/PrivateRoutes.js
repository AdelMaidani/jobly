import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./User";

const { UserType } = useUser();

const Home = () => {
  UserType === "" ? <Outlet /> : <Navigate to={"/"} />;
};

const EmployerDashboard = () => {
  UserType === "Employer" ? <Outlet /> : <Navigate to={"/"} />;
};

const EmployeeDashboard = () => {
  UserType === "Employee" ? <Outlet /> : <Navigate to={"/"} />;
};

export { Home, EmployeeDashboard, EmployerDashboard };
