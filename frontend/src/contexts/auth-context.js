import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isStayLoggedIn: false,

  account: "",
  avatar: "",
  username: "",
  role: "",
  token: "",

  OnLoggedIn: (token, role) => { },
  OnLoggedOut: () => { },
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStayLoggedIn, setIsStayLoggedIn] = useState(false);

  const [account, setAccount] = useState("");
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("token") != null &&
      localStorage.getItem("role") != null
    )
      setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem("account");
      localStorage.removeItem("avatar");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
    else if (isStayLoggedIn) {
      localStorage.setItem("account", account);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    }
  }, [isLoggedIn])

  const OnLoggedIn = (account, avatar, username, token, role, isStayLoggedIn) => {
    setIsLoggedIn(true);
    setAccount(account);
    setAvatar(avatar);
    setUsername(username);
    setToken("Bearer " + token);
    setRole(role);
    setIsStayLoggedIn(isStayLoggedIn);
  };

  const OnLoggedOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,

        account: account !== "" ? account : localStorage.getItem("account"),
        avatar: avatar !== "" ? avatar : localStorage.getItem("avatar"),
        username: username !== "" ? username : localStorage.getItem("username"),
        token: token !== "" ? token : localStorage.getItem("token"),
        role: role !== "" ? role : localStorage.getItem("role"),

        OnLoggedIn: OnLoggedIn,
        OnLoggedOut: OnLoggedOut
      }} >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
