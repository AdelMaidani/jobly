import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logos/JoblyLogo.png";
import MenuIcon from "../assets/Icons/menu.png";
import { useUser } from "../context/User";

function NavbarEmployer() {
  const { userId, userInfo, setId, setInfo } = useUser();
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    axios({
      method: "Get",
      withCredentials: true,
      url: "http://localhost:3000/userVerify",
    })
      .then((res) => {
        setId(res.data._id);
      })
      .catch((err) => console.log(err));

    if (userId === "") {
    } else {
      axios({
        method: "Post",
        url: "http://localhost:3000/company/data",
        data: { id: userId },
      }).then((res) => {
        setInfo(res.data[0]);
      });
    }
  }, [userId]);

  const navLinkActive = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "white" : "black",
      color: isActive ? "black" : "white",
    };
  };

  const Logout = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/company/logout",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  const onClickLink = () => {
    if (window.innerWidth < 768) {
      setShowMenu(!showMenu);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(true);
      }
    };
    window.addEventListener("resize", handleResize);
  }, [setShowMenu]);

  return (
    <div>
      <div className="bg-black flex justify-between items-center ">
        <p className="text-white font-bold hidden md:block ml-44">
          {userInfo.companyName}
        </p>
        <img
          className={`" h-9 transition duration-1000 hover:rotate-90 md:hidden " ${
            showMenu ? "fixed z-10 " : "null"
          }`}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          src={MenuIcon}
          alt="menu"
        />
        <p
          className={`" md:hidden text-white font-bold " ${
            showMenu ? "absolute  left-12 " : "null"
          }`}
        >
          {userInfo.companyName}
        </p>
        <img className="h-14 transition duration-1000 " src={Logo} alt="Logo" />
      </div>
      <div
        className={`" h-screen md:bg-black pt-5 fixed top-0 md:w-40 bottom-0 bg-black text-white flex flex-col items-center " ${
          showMenu ? " w-full" : null
        }`}
      >
        <div className={` "flex justify-center " ${showMenu ? "p-1" : null}`}>
          <img
            src={userInfo.companyLogo}
            alt="companyLogo"
            className={`" rounded-full md:border-2 h-28 w-28 md:block" ${
              showMenu ? "block  border-white border-2" : "hidden"
            }`}
          />
        </div>
        <div
          className={`" w-full text-center mt-10  md:flex" ${
            showMenu ? "flex flex-col" : "hidden"
          }`}
        >
          <NavLink
            style={navLinkActive}
            className={`"mb-20 transition duration-500 p-2 border border-black ml-2 mr-2 hover:border-white " ${
              showMenu ? "mb-14" : "hidden"
            }`}
            onClick={onClickLink}
            to="/"
          >
            Profile
          </NavLink>
          <NavLink
            style={navLinkActive}
            className={`"mb-20 transition duration-500 p-2 border border-black ml-2 mr-2 hover:border-white " ${
              showMenu ? "mb-14" : "hidden"
            }`}
            to="/listajob"
            onClick={onClickLink}
          >
            List a Job
          </NavLink>
          <NavLink
            style={navLinkActive}
            className={`"mb-20 transition duration-500 p-2 border border-black ml-2 mr-2 hover:border-white " ${
              showMenu ? "mb-14" : "hidden"
            }`}
            onClick={onClickLink}
            to="/application"
          >
            Applicants
          </NavLink>
          <NavLink
            className={`"mb-20 transition duration-500 p-2 border border-black ml-2 mr-2 text-red-500 hover:border-red-500 " ${
              showMenu ? "mb-14" : "hidden"
            }`}
            to="/"
            onClick={Logout}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavbarEmployer;
