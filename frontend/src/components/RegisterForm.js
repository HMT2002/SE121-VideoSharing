import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../UI elements/Card";
import Input from "../UI elements/Input";
import Button from "../UI elements/Button";

import "../styles/RegisterForm.css";

const validateEmail = (email) => {
    return email
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

//#region Reducers
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

const emailReducer = (state, action) => {
    if (action.type === "EMAIL_INPUT_CHANGE") {
        return {
            value: action.payload,
            isValid: null
        }
    }
    if (action.type === "EMAIL_INPUT_BLUR") {
        return {
            value: state.value,
            isValid: validateEmail(state.value) !== null &&
                state.value.trim().length > 0
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

const PassConfirmReducer = (state, action) => {
    if (action.type === "PASS_CONFIRM_INPUT_CHANGE") {
        return {
            value: action.payload.value,
            password: action.payload.password,
            isValid: null
        }
    }
    if (action.type === "PASS_CONFIRM_INPUT_BLUR") {
        return {
            value: state.value,
            password: state.password,
            isValid: state.value === state.password &&
                state.value.trim().length >= 6
        }
    }
    return {
        value: "",
        password: "",
        isValid: false
    }
}
//#endregion

const RegisterForm = (props) => {

    //#region Hooks & const declaration
    const initState = { value: "", isValid: null }

    const [usernameInput, usernameDispatch] = useReducer(UsernameReducer, initState);
    const [emailInput, emailDispatch] = useReducer(emailReducer, initState);
    const [passwordInput, passwordDispatch] = useReducer(PasswordReducer, initState);
    const [passConfirmInput, passConfirmDispatch] = useReducer(PassConfirmReducer, { ...initState, password: "" });

    const [isValid, setIsValid] = useState();

    const { isValid: usernameValidation } = usernameInput;
    const { isValid: emailValidation } = emailInput;
    const { isValid: passwordValidation } = passwordInput;
    const { isValid: passConfirmValidation } = passConfirmInput;

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passConfirmRef = useRef();
    //#endregion

    //#region useEffects execution
    useEffect(() => {
        if (usernameValidation === true &&
            emailValidation === true &&
            passwordValidation === true &&
            passConfirmValidation === true) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [
        usernameValidation, emailValidation,
        passwordValidation, passConfirmValidation
    ]);
    //#endregion

    //#region event Handlers
    const UsernameInputChangeHandler = (event) => {
        const action = {
            type: "USERNAME_INPUT_CHANGE",
            payload: event.target.value
        };
        usernameDispatch(action);
        // setLoginMessage("");
    }

    const UsernameInputBlurHandler = () => {
        const action = { type: "USERNAME_INPUT_BLUR" };
        usernameDispatch(action);
    }

    const EmailInputChangeHandler = (event) => {
        const action = {
            type: "EMAIL_INPUT_CHANGE",
            payload: event.target.value
        };
        emailDispatch(action);
        // setLoginMessage("");
    }

    const EmailInputBlurHandler = () => {
        const action = { type: "EMAIL_INPUT_BLUR" };
        emailDispatch(action);
    }

    const PasswordInputChangeHandler = (event) => {
        const action = {
            type: "PASSWORD_INPUT_CHANGE",
            payload: event.target.value
        };
        passwordDispatch(action);
        // setLoginMessage("");
    }

    const PasswordInputBlurHandler = () => {
        const action = { type: "PASSWORD_INPUT_BLUR" };
        passwordDispatch(action);
    }

    const PassConfirmInputChangeHandler = (event) => {
        const action = {
            type: "PASS_CONFIRM_INPUT_CHANGE",
            payload: {
                value: event.target.value,
                password: passwordInput.value
            }
        };
        passConfirmDispatch(action);
        // setLoginMessage("");
    }

    const PassConfirmInputBlurHandler = () => {
        const action = { type: "PASS_CONFIRM_INPUT_BLUR" };
        passConfirmDispatch(action);
    }

    const RegisterSubmitHandler = (event) => {
        event.preventDefault();
        if (isValid) {
            props.onUserRegister(
                usernameInput.value,
                emailInput.value,
                passwordInput.value);
        } else if (!usernameInput.isValid) {
            usernameRef.current.throwError();
        } else if (!emailInput.isValid) {
            emailRef.current.throwError();
        } else if (!passwordInput.isValid) {
            passwordRef.current.throwError();
        } else {
            passConfirmRef.current.throwError();
        }
    }
    //#endregion

    return (
        <Card className="register-form">
            <form onSubmit={RegisterSubmitHandler}>
                <h1 className="register-form__title">Create New Account</h1>
                <Input
                    ref={usernameRef}
                    className="register-form__input"
                    label="Username"
                    variant="standard"
                    value={usernameInput.value}
                    onChange={UsernameInputChangeHandler}
                    onBlur={UsernameInputBlurHandler}
                    isValid={usernameInput.isValid !== false}
                    helperText={"Username must not be empty!"}
                />
                <Input
                    ref={emailRef}
                    className="register-form__input"
                    label="Email"
                    variant="standard"
                    value={emailInput.value}
                    onChange={EmailInputChangeHandler}
                    onBlur={EmailInputBlurHandler}
                    isValid={emailInput.isValid !== false}
                    helperText={"Invalid email!"}
                />
                <Input
                    ref={passwordRef}
                    className="register-form__input"
                    label="Password"
                    variant="standard"
                    value={passwordInput.value}
                    onChange={PasswordInputChangeHandler}
                    onBlur={PasswordInputBlurHandler}
                    isValid={passwordInput.isValid !== false}
                    helperText={"Password must be 6 characters or above!"}
                />
                <Input
                    ref={passConfirmRef}
                    className="register-form__input"
                    label="Password Confirm"
                    variant="standard"
                    value={passConfirmInput.value}
                    onChange={PassConfirmInputChangeHandler}
                    onBlur={PassConfirmInputBlurHandler}
                    isValid={passConfirmInput.isValid !== false}
                    helperText={"Password unmatched!"}
                />
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