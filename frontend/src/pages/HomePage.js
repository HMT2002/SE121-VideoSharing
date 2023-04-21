import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/auth-context";
import Button from "../UI elements/Button";

const HomePage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const LogoutHandler = () => {
        authContext.OnLoggedOut();
        navigate("/login");
    }

    return (
        <React.Fragment>
            <h1>This is home page!</h1>
            <Button onClick={LogoutHandler}>Logout</Button>
        </React.Fragment>
    );
}

export default HomePage;