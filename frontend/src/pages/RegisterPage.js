import React, { useContext } from "react";

import { Navigate } from "react-router-dom";

import AuthContext from "../contexts/auth-context";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
    const authContext = useContext(AuthContext);

    if (authContext.isLoggedIn) {
        return (<Navigate to="/" />);
    } else {
        return (<RegisterForm />);
    }
}

export default RegisterPage;