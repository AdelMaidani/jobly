import Logo from "../assets/Logos/JoblyLogo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  return (
    <Box className=" mt-auto bg-black text-white text-xs p-5 text-center flex flex-col md:flex-row justify-around items-center">
      <div className="w-80 flex flex-col sm:text-left">
        <h3 className="underline underline-offset-8 mb-3 ">CONTACT US</h3>
        <div className="flex flex-col text-xs">
          <span className="text-gray-300"> Ahuachapán</span>
          <span className="text-gray-300">2450520223</span>
          <span className="text-gray-300">El Salvador</span>
          <span className="text-gray-300">
            Bo El Calvario 2 Av Sur, Concepción de Ataco
          </span>
        </div>
      </div>
      <hr
        style={{ color: "white", maxWidth: "100px", minWidth: "40px" }}
        className="md:rotate-90 text-center m-5"
      />
      <div className="w-80 flex flex-col">
        <h3 className="underline underline-offset-8 mb-3">LINKS</h3>
        <div className="flex flex-col text-xs">
          <Link className="text-gray-300 hover:text-white" to="/jobs">
            Jobs
          </Link>
          <Link className="text-gray-300 hover:text-white" to="/companies">
            Companies
          </Link>
          <Link className="text-gray-300 hover:text-white" to="/companySignup">
            Register as company
          </Link>
          <Link className="text-gray-300 hover:text-white" to="/employeeSignup">
            Register as person
          </Link>
        </div>
      </div>
      <hr
        style={{ color: "white", maxWidth: "100px", minWidth: "40px" }}
        className="md:rotate-90 text-center m-5"
      />

      <Link to={"/"} className="flex flex-col items-center">
        <img className="h-12" src={Logo} alt="Logo" />
      </Link>
    </Box>
  );
}
const Box = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export default Footer;
