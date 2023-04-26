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

  useEffect(() => {
    if (
      localStorage.getItem("token") != null &&
      localStorage.getItem("role") != null
    )
      setIsLoggedIn(true);
  }, []);

  const OnLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const OnLoggedOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const StayLoggedIn = (token, role) => {
    localStorage.setItem("token", "Bearer " + token);
    localStorage.setItem("role", role);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
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
