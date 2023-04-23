import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { RegisterAction } from "../APIs/auth-apis";

import AuthContext from "../contexts/auth-context";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.isLoggedIn) navigate("/");
    }, [navigate, authContext.isLoggedIn]);

    const UserRegisterHandler = async (username, email, password) => {
        const response = await RegisterAction({
            account: username,
            email: email,
            password: password
        });

        console.log(response);

        // if (response.status === "success sign in") {
        //     authContext.OnLoggedIn(response.token, response.role);
        //     navigate("/");
        // }

        // if (response.status === "fail" && response.message === "Wrong information.") {
        //     setLoginMessage("Wrong username or password!");
        // }
    }

    return (
        <RegisterForm
            onUserRegister={UserRegisterHandler}
        />
    );
}

export default RegisterPage;