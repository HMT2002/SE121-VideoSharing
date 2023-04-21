import React from "react";

// import { LoginAction } from "../APIs/auth-apis";

import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    const UserLoginHandler = async (username, password) => {
        // const response = await LoginAction({ username, password }); -- this currently fail
        console.log("username : ", username);
        console.log("password : ", password);
    }

    return (
        <LoginForm onUserLogin={UserLoginHandler} />
    );
}

export default LoginPage;