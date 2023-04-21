import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "../UI elements/Card";
import Button from "../UI elements/Button";
import Input from "../UI elements/Input";

import "../styles/LoginForm.css";

const LoginForm = (props) => {
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const UsernameInputChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const PasswordInputChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const LoginSubmitHandler = (event) => {
        event.preventDefault();
        props.onUserLogin(enteredUsername, enteredPassword);
    }

    return (
        <Card className="login-form">
            <form onSubmit={LoginSubmitHandler}>
                <h1 className="login-form__title">Account Login</h1>
                <Input
                    className="login-form__input"
                    label="Username"
                    variant="standard"
                    value={enteredUsername}
                    onChange={UsernameInputChangeHandler}
                />
                <Input
                    className="login-form__input"
                    label="Password"
                    variant="standard"
                    type="password"
                    value={enteredPassword}
                    onChange={PasswordInputChangeHandler}
                />
                <Link className="login-form__forget-password-redirect" to="/">Forgot password?</Link>
                <Button className="login-form__submit" type="submit" >LOGIN</Button>
                <Link className="button login-form__register-redirect" to="/create-new-account">CREATE NEW ACCOUNT</Link>
            </form>
        </Card>
    );
}

export default LoginForm;