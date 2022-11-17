import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvide({ children }) {
  const [UserType, setUserType] = useState("");

  function setUser(userType) {
    setUserType(userType);
  }

  return (
    <UserContext.Provider value={{ UserType, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
