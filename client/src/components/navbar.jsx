import Logo from "../assets/Logos/JoblyLogo.png";
import MenuIcon from "../assets/Icons/menu.png";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

function Navbar() {
  const [showMenu, setShowMenu] = useState(true);
  const onClickChangeState = () => {
    setShowMenu(!showMenu);
  };

  const activeNavCss = ({ isActive }) => {
    return {
      textDecoration: isActive ? "underline" : "none",
      textUnderlineOffset: isActive ? "8px" : "none",
      transitionDuration: isActive ? "500ms" : "none",
    };
  };

  return (
    <Box className="sticky top-0 z-10 text-xs">
      <div className="bg-black text-white p-2 flex justify-between items-center">
        <div className="w-80 flex items-center justify-center">
          <Link to="/">
            <img src={Logo} className="h-12" alt="Jobly Logo" />
          </Link>
        </div>
        <div className="hidden md:flex w-80 items-center justify-center">
          <NavLink
            style={activeNavCss}
            to="/jobs"
            className="mr-5 p-3 transition duration-500 ease-linear hover:border-white border border-black"
          >
            Jobs
          </NavLink>
          <NavLink
            style={activeNavCss}
            to="/companies"
            className="mr-5 p-3 transition duration-500 ease-linear hover:border-white border border-black"
          >
            Companies
          </NavLink>
        </div>
        <div className="flex items-center w-80 justify-center">
          <NavLink
            style={activeNavCss}
            to="/companyLogin"
            className="hidden border border-white md:block font-black mr-5 p-3 bg-white text-black transition duration-500 ease-linear hover:bg-black hover:text-white hover:underline underline-offset-8"
          >
            For Employers
          </NavLink>
          <NavLink
            style={activeNavCss}
            to="/employeeLogin"
            className="hidden md:block mr-5 p-3 transition duration-500 ease-linear hover:border-white border border-black"
          >
            Login
          </NavLink>
          <NavLink
            style={activeNavCss}
            to="/employeeSignup"
            className="hidden md:block mr-5 p-3 transition duration-500 ease-linear hover:border-white border border-black"
          >
            Register
          </NavLink>
          <div>
            <img
              className="h-10 w-full block md:hidden  transition duration-500 hover:rotate-90"
              src={MenuIcon}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              alt="menu icon"
            />
          </div>
        </div>
      </div>
      {/* Under */}
      <div className={`${showMenu ? "hidden" : null}`}>
        <div className="flex flex-col md:hidden bg-black text-white text-center h-screen">
          <NavLink
            style={activeNavCss}
            className="hover:bg-white hover:text-black p-5 w-full transition duration-500 mb-10"
            to="/jobs"
            onClick={onClickChangeState}
          >
            Jobs
          </NavLink>
          <NavLink
            className="hover:bg-white hover:text-black p-5 w-full transition duration-500 mb-10"
            to="/companies"
            onClick={onClickChangeState}
            style={activeNavCss}
          >
            Companies
          </NavLink>
          <NavLink
            className="hover:bg-white hover:text-black p-5 w-full transition duration-500 mb-10"
            to="/companyLogin"
            onClick={onClickChangeState}
          >
            For Employer
          </NavLink>
          <NavLink
            style={activeNavCss}
            className="hover:bg-white hover:text-black p-5 w-full transition duration-500 mb-10"
            to="/employeeLogin"
            onClick={onClickChangeState}
          >
            Login
          </NavLink>
          <NavLink
            style={activeNavCss}
            className="hover:bg-white hover:text-black p-5 w-full transition duration-500 mb-10"
            to="/employeeSignup"
            onClick={onClickChangeState}
          >
            Register
          </NavLink>
        </div>
      </div>
    </Box>
  );
}

const Box = styled.div`
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
`;

export default Navbar;
