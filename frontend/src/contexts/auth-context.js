import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    token: "",
    role: "",
    OnLoggedIn: (token, role) => { },
    OnLoggedOut: () => { }
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("token") &&
            !localStorage.getItem("role")) {
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
        }
    }, [])

    const OnLoggedIn = (token, role) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
    }

    const OnLoggedOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                token: localStorage.getItem("token"),
                role: localStorage.getItem("role"),
                OnLoggedIn: OnLoggedIn,
                OnLoggedOut: OnLoggedOut
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;