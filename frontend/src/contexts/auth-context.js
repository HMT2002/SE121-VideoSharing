import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  role: "",
  OnLoggedIn: (token, role) => { },
  OnLoggedOut: () => { },
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("token") != null &&
      localStorage.getItem("role") != null
    )
      setIsLoggedIn(true);
  }, []);

  const OnLoggedIn = (token, role) => {
    setIsLoggedIn(true);
    setToken("Bearer " + token);
    setRole(role);
  };

  const OnLoggedOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const StayLoggedIn = () => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        token: token !== "" ? token : localStorage.getItem("token"),
        role: role !== "" ? role : localStorage.getItem("role"),
        OnLoggedIn: OnLoggedIn,
        OnLoggedOut: OnLoggedOut,
        StayLoggedIn: StayLoggedIn
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
