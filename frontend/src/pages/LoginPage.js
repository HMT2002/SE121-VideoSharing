import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { LoginAction } from "../APIs/auth-apis";

import LoginForm from "../components/LoginForm";
import AuthContext from "../contexts/auth-context";

const LoginPage = () => {
    const authContext = useContext(AuthContext);

    const UserLoginHandler = async (username, password) => {
        const response = await LoginAction({
            account: username,
            password: password
        });

        if (response.status === "success sign in") {
            authContext.OnLoggedIn(response.token, response.role);
            return (<Navigate to="/" />);
        }

        if (response.status === "fail" && response.message === "Wrong information.") {
            console.log(response.message);
        }
    }

    if (authContext.isLoggedIn) {
        return (<Navigate to="/" />);
    } else {
        return (<LoginForm onUserLogin={UserLoginHandler} />);
    }
}

export default LoginPage;