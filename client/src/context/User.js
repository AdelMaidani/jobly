import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvide({ children }) {
  const [UserType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({});

  function setUser(userType) {
    setUserType(userType);
  }

  function setId(id) {
    setUserId(id);
  }

  function setInfo(info) {
    setUserInfo(info);
  }

  return (
    <UserContext.Provider
      value={{ setUser, UserType, userInfo, setId, userId, setInfo }}
    >
      {children}
    </UserContext.Provider>
  );
}
