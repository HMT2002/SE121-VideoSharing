import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../UI elements/Card";
import Button from "../UI elements/Button";
import Input from "../UI elements/Input";

import "../styles/LoginForm.css";

const UsernameReducer = (state, action) => {
    if (action.type === "USERNAME_INPUT_CHANGE") {
        return {
            value: action.payload,
            isValid: null
        }
    }
    if (action.type === "USERNAME_INPUT_BLUR") {
        return {
            value: state.value,
            isValid: state.value.trim().length > 0
        }
    }
    return {
        value: "",
        isValid: false
    }
}

const PasswordReducer = (state, action) => {
    if (action.type === "PASSWORD_INPUT_CHANGE") {
        return {
            value: action.payload,
            isValid: null
        }
    }
    if (action.type === "PASSWORD_INPUT_BLUR") {
        return {
            value: state.value,
            isValid: state.value.trim().length >= 6
        }
    }
    return {
        value: "",
        isValid: false
    }
}

const LoginForm = (props) => {
    const initState = { value: "", isValid: null };

    const [usernameInput, usernameDispatch] = useReducer(UsernameReducer, initState);
    const [passwordInput, passwordDispatch] = useReducer(PasswordReducer, initState);
    const [isValid, setIsValid] = useState(false);

    const [loginMessage, setLoginMessage] = useState("");

    const { isValid: usernameValidation } = usernameInput;
    const { isValid: passwordValidation } = passwordInput;

    const usernameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if (usernameValidation === true &&
            passwordValidation === true) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    }, [usernameValidation, passwordValidation])

    useEffect(() => {
        setLoginMessage(props.message);
    }, [props.message])

    const UsernameInputChangeHandler = (event) => {
        const action = {
            type: "USERNAME_INPUT_CHANGE",
            payload: event.target.value
        };
        usernameDispatch(action);
        setLoginMessage("");
    }

    const UsernameInputBlurHandler = () => {
        const action = { type: "USERNAME_INPUT_BLUR" };
        usernameDispatch(action);
    }

    const PasswordInputChangeHandler = (event) => {
        const action = {
            type: "PASSWORD_INPUT_CHANGE",
            payload: event.target.value
        };
        passwordDispatch(action);
        setLoginMessage("");
    }

    const PasswordInputBlurHandler = () => {
        const action = { type: "PASSWORD_INPUT_BLUR" };
        passwordDispatch(action);
    }

    const LoginSubmitHandler = (event) => {
        event.preventDefault();
        if (isValid) {
            props.onUserLogin(usernameInput.value, passwordInput.value);
        } else if (!usernameInput.isValid) {
            console.log(usernameInput.isValid);
            usernameRef.current.throwError();
        } else {
            passwordRef.current.throwError();
        }
    }

    return (
        <Card className={`login-form ${loginMessage !== "" ? "message" : ""}`}>
            <form onSubmit={LoginSubmitHandler}>
                <h1 className="login-form__title">Account Login</h1>
                {loginMessage !== "" && <div className="login-form__message">{loginMessage}</div>}
                <Input
                    ref={usernameRef}
                    className="login-form__input"
                    label="Username"
                    variant="standard"
                    value={usernameInput.value}
                    onChange={UsernameInputChangeHandler}
                    onBlur={UsernameInputBlurHandler}
                    isValid={usernameInput.isValid !== false}
                    helperText={"Username must not be empty!"}
                />
                <Input
                    ref={passwordRef}
                    className="login-form__input"
                    label="Password"
                    variant="standard"
                    type="password"
                    value={passwordInput.value}
                    onChange={PasswordInputChangeHandler}
                    onBlur={PasswordInputBlurHandler}
                    isValid={passwordInput.isValid !== false}
                    helperText={"Password must be 6 characters or above!"}
                />
                <Link className="login-form__forget-password-redirect" to="/" >Forgot password?</Link>
                <Button className="login-form__submit" type="submit" >LOGIN</Button>
                <Link className="button login-form__register-redirect" to="/create-new-account">CREATE NEW ACCOUNT</Link>
            </form>
        </Card>
    );
}

export default LoginForm;