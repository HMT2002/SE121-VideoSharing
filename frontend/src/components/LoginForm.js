import React from "react";

import Card from "./Card";
import TextField from "@mui/material/TextField";

import "../styles/LoginForm.css";

const LoginForm = () => {
    return (
        <Card className="login-form">
            <form>
                <h1 className="login-form__title">Account Login</h1>
                <div className="login-form__input">
                    <TextField className="login-form__input-textfield" label="Username" variant="standard" />
                </div>
                <div className="login-form__input">
                    <TextField className="login-form__input-textfield" label="Password" variant="standard" type="password" />
                </div>
                <div className="login-form__forget-password-redirect">Forgot password?</div>
                <button className="login-form__login-btn" type="submit" >LOGIN</button>
                <button className="login-form__register-btn">CREATE NEW ACCOUNT</button>
            </form>
        </Card>
    );
}

export default LoginForm;