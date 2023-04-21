import React from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import TextField from "@mui/material/TextField";

import "../styles/RegisterForm.css";

const RegisterForm = () => {
    return (
        <Card className="register-form">
            <form>
                <h1 className="register-form__title">Create New Account</h1>
                <div className="register-form__input">
                    <TextField className="register-form__input-textfield" label="Username" variant="standard" />
                </div>
                <div className="register-form__input">
                    <TextField className="register-form__input-textfield" label="Email" variant="standard" />
                </div>
                <div className="register-form__input">
                    <TextField className="register-form__input-textfield" label="Password" variant="standard" type="password" />
                </div>
                <div className="register-form__input">
                    <TextField className="register-form__input-textfield" label="Password Confirm" variant="standard" type="password" />
                </div>
                <div className="register-form__login-redirect" to="/">
                    <div>Already have account?</div>
                    <Link>Login</Link>
                </div>
                <button className="register-form__submit-btn" type="submit" >REGISTER</button>
            </form>
        </Card>
    );
}

export default RegisterForm;