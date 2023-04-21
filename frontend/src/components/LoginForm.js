import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import TextField from "@mui/material/TextField";

import "../styles/LoginForm.css";

const LoginForm = (props) => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const EmailInputChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    }

    const PasswordInputChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const LoginSubmitHandler = (event) => {
        event.preventDefault();
        props.onUserLogin(enteredEmail, enteredPassword);
    }

    return (
        <Card className="login-form">
            <form onSubmit={LoginSubmitHandler}>
                <h1 className="login-form__title">Account Login</h1>
                <div className="login-form__input">
                    <TextField
                        className="login-form__input-textfield"
                        label="Username"
                        variant="standard"
                        value={enteredEmail}
                        onChange={EmailInputChangeHandler}
                    />
                </div>
                <div className="login-form__input">
                    <TextField
                        className="login-form__input-textfield"
                        label="Password"
                        variant="standard"
                        type="password"
                        value={enteredPassword}
                        onChange={PasswordInputChangeHandler}
                    />
                </div>
                <Link className="login-form__forget-password-redirect" to="/">Forgot password?</Link>
                <button className="login-form__login-btn" type="submit" >LOGIN</button>
                <Link className="login-form__register-redirect" to="/create-new-account">CREATE NEW ACCOUNT</Link>
            </form>
        </Card>
    );
}

export default LoginForm;