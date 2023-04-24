import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { LoginAction } from "../APIs/auth-apis";

import LoginForm from "../components/auth/LoginForm";
import AuthContext from "../contexts/auth-context";

const LoginPage = () => {
    const [loginMessage, setLoginMessage] = useState("");
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.isLoggedIn) navigate("/");
    }, [navigate, authContext.isLoggedIn]);

    const UserLoginHandler = async (username, password) => {
        const response = await LoginAction({
            account: username,
            password: password
        });

        if (response.status === "success sign in") {
            authContext.OnLoggedIn(response.token, response.role);
            navigate("/");
        }

        if (response.status === "fail" && response.message === "Wrong information.") {
            setLoginMessage("Wrong username or password!");
        }
    }

    return (
        <LoginForm
            onUserLogin={UserLoginHandler}
            message={loginMessage}
        />
    );
}

export default LoginPage;