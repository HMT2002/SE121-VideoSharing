import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/auth-context";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.isLoggedIn) navigate("/");
    }, [navigate, authContext.isLoggedIn]);

    return (<RegisterForm />);
}

export default RegisterPage;