import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

const PersonContext = createContext();

export function PersonProvider({ children }) {
  const [Person, setPerson] = useState({});

  useEffect(() => {
    const cookie = new Cookies();
    const decode = jwtDecode(cookie.get("token"));

    axios({
      method: "Post",
      url: "http://localhost:3000/person/persondata",
      headers: { "content-type": "application/json" },
      data: { id: decode._id },
    })
      .then((res) => {
        setPerson(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <PersonContext.Provider value={{ Person }}>
      {children}
    </PersonContext.Provider>
  );
}

export default PersonContext;
