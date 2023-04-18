import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  role: '',
  login: (token, role) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialRole = localStorage.getItem('role') || 'guest';

  const [token, setToken] = useState(initialToken);
  const [currentUserRole, setCurrentUserRole] = useState(initialRole);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, role) => {
    localStorage.setItem('token', 'Bearer ' + token);
    localStorage.setItem('role', role);

    setToken('Bearer ' + token);
    setCurrentUserRole(role);
  };

  const logoutHandler = () => {
    setToken(null);
    setCurrentUserRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: currentUserRole,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
