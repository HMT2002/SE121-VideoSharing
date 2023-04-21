import React from "react";

import { LoginAction } from "../APIs/auth-apis";

import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    const UserLoginHandler = (username, password) => {
        const userData = {
            account: username,
            password: password,
        }

        const response = LoginAction(userData); // --this currently fail
        console.log(response);
        console.log("username : ", username);
        console.log("password : ", password);
    }

    return (
        <LoginForm onUserLogin={UserLoginHandler} />
    );
}

export default LoginPage;