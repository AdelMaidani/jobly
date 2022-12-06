import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logos/JoblyLogo.png";
import MenuIcon from "../assets/Icons/menu.png";
import { useUser } from "../context/User";
import axios from "axios";

function NavbarPerson() {
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
        url: "http://localhost:3000/person/personData",
        data: { id: userId },
      }).then((res) => {
        setInfo(res.data[0]);
      });
    }
  }, [userId]);

  const Logout = () => {
    axios({
      method: "Get",
      withCredentials: true,
      url: "http://localhost:3000/person/logout",
    }).then((res) => {
      console.log(res);
      window.location.href = "/";
    });
  };

  const navLinkActive = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "white" : "black",
      color: isActive ? "black" : "white",
    };
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setShowMenu(true);
    }
  };

  const onClickChange = () => {
    if (window.innerWidth < 768) {
      setShowMenu(!showMenu);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="bg-black flex items-center ">
        <p className="text-white font-bold hidden md:block ml-44">
          {userInfo.fullName}
        </p>
        <img
          className={`" h-9 transition duration-1000 hover:rotate-90 md:hidden " ${
            showMenu ? "absolute z-10 " : "null"
          }`}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          src={MenuIcon}
          alt="menu"
        />
        <img
          className="h-14 transition duration-1000 md:ml-auto"
          src={Logo}
          alt="Logo"
        />
      </div>
      <div
        className={`" h-screen md:bg-black pt-5 fixed top-0 md:w-40 bottom-0 bg-black text-white flex flex-col items-center " ${
          showMenu ? " w-full" : null
        }`}
      >
        <div className={` "flex justify-center " ${showMenu ? "p-1" : null}`}>
          <img
            src={userInfo.profilePicture}
            alt="person"
            className={`" rounded-full  h-28 w-28 border md:block" ${
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
            onClick={onClickChange}
            to="/"
          >
            Profile
          </NavLink>
          <NavLink
            style={navLinkActive}
            className={`"mb-20 transition duration-500 p-2 border border-black ml-2 mr-2 hover:border-white " ${
              showMenu ? "mb-14" : "hidden"
            }`}
            onClick={onClickChange}
            to="/applications"
          >
            Applications
          </NavLink>
          <NavLink
            style={navLinkActive}
            className={`"mb-20 transition duration-500 p-2 border border-black ml-2 mr-2 hover:border-white " ${
              showMenu ? "mb-14" : "hidden"
            }`}
            onClick={onClickChange}
            to="/person-jobs"
          >
            Jobs
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

export default NavbarPerson;
