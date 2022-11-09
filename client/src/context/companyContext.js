import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Cookie from "universal-cookie";
import jwtDecode from "jwt-decode";

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState({});
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const cookie = new Cookie();
    const decodedId = jwtDecode(cookie.get("token"));

    axios({
      method: "Post",
      url: "http://localhost:3000/company/data",
      headers: { "content-type": "application/json" },
      data: { id: decodedId },
    })
      .then((res) => {
        setCompany(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CompanyContext.Provider value={{ company, showMenu, setShowMenu }}>
      {children}
    </CompanyContext.Provider>
  );
}

export default CompanyContext;
