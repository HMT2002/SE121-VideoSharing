import React from "react";
import { Link } from "react-router-dom";

import Card from "../UI elements/Card";
import Input from "../UI elements/Input";
import Button from "../UI elements/Button";

import "../styles/RegisterForm.css";

const RegisterForm = () => {
    return (
        <Card className="register-form">
            <form>
                <h1 className="register-form__title">Create New Account</h1>
                <Input className="register-form__input" label="Username" variant="standard" />
                <Input className="register-form__input" label="Email" variant="standard" />
                <Input className="register-form__input" label="Password" variant="standard" />
                <Input className="register-form__input" label="Password Confirm" variant="standard" />
                <div className="register-form__login-redirect" to="/">
                    <div>Already have account?</div>
                    <Link to="/login">Login</Link>
                </div>
                <Button className="register-form__submit-btn" type="submit" >REGISTER</Button>
            </form>
        </Card>
    );
}

export default RegisterForm;