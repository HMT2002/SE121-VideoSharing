import React, { useContext, useState, useRef, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { LoginAction } from '../APIs/auth-apis';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import AuthContext from '../contexts/auth-context';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Card from '../components/UI elements/Card';
import Button from '../components/UI elements/Button';
import Input from '../components/UI elements/Input';

import '../styles/LoginPage.css';

//#region helpers
const UsernameValidator = (username) => {
  return username.trim().length > 0;
};

const PasswordValidator = (password) => {
  return password.trim().length >= 6;
};
//#endregion

const LoginPage = () => {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const [loginMessage, setLoginMessage] = useState('');
  const [codeResponse, setCodeResponse] = useState('');

  const [isStayLoggedIn, setIsStayLoggedIn] = useState(true);

  const [usernameValidation, setUsernameValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const LoginGoogle = useGoogleLogin({
    onSuccess: async(codeResponse) => {        
    console.log(codeResponse);
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + codeResponse.access_token,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer ' + codeResponse.access_token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log(data);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  //#region input change handlers
  const UsernameInputChangeHandler = () => {
    setUsernameValidation(null);
    setLoginMessage('');
  };

  const PasswordInputChangeHandler = () => {
    setPasswordValidation(null);
    setLoginMessage('');
  };
  //#endregion

  //#region input blur handlers
  const UsernameInputBlurHandler = () => {
    const inputValue = usernameRef.current.getValue();
    setUsernameValidation(UsernameValidator(inputValue));
  };

  const PasswordInputBlurHandler = () => {
    const inputValue = passwordRef.current.getValue();
    setPasswordValidation(PasswordValidator(inputValue));
  };

  const StaySignedInChangeHandler = () => {
    setIsStayLoggedIn((prev) => {
      return !prev;
    });
  };
  //#endregion

  //#region on submit handlers
  const LoginSubmitHandler = (event) => {
    event.preventDefault();

    const usernameInput = usernameRef.current.getValue();
    const passwordInput = passwordRef.current.getValue();

    const isValidUsername = UsernameValidator(usernameInput);
    const isValidPassword = PasswordValidator(passwordInput);

    if (isValidUsername && isValidPassword) {
      UserLoginHandler(usernameInput, passwordInput);
    } else if (!isValidUsername) {
      setUsernameValidation(false);
    } else {
      setPasswordValidation(false);
    }
  };

  const UserLoginHandler = async (username, password) => {
    const response = await LoginAction({
      account: username,
      password: password,
    });

    if (response.status === 'success sign in') {
      authContext.OnUserLogin(
        response.data.account,
        response.data.avatar,
        response.data.username,
        response.data.token,
        response.data.role,
        isStayLoggedIn
      );

      return navigate('/');
    }

    if (response.status === 'fail' && response.message === 'Wrong information.') {
      setLoginMessage('Wrong username or password!');
    }
  };
  //#endregion

  if (authContext.isAuthorized) return navigate('/');

  return (
    <Card className="login-form">
      <Link
        className="app-header__logo"
        style={{
          position: 'fixed',
          top: 50,
          left: 100,
          fontSize: '2.5rem',
          fontWeight: 800,
        }}
        to="/"
      >
        Logo
      </Link>
      <form onSubmit={LoginSubmitHandler}>
        <h1 className="login-form__title">Account Login</h1>
        {loginMessage !== '' && <div className="login-form__message">{loginMessage}</div>}
        <Input
          ref={usernameRef}
          className="login-form__input"
          label="Username"
          variant="standard"
          onChange={UsernameInputChangeHandler}
          onBlur={UsernameInputBlurHandler}
          isValid={usernameValidation !== false}
          helperText={'Username must not be empty!'}
        />
        <Input
          ref={passwordRef}
          className="login-form__input"
          label="Password"
          variant="standard"
          type="password"
          onChange={PasswordInputChangeHandler}
          onBlur={PasswordInputBlurHandler}
          isValid={passwordValidation !== false}
          helperText={'Password must be 6 characters or above!'}
          passwordToggle="true"
        />
        <div className="login-form__additional flex">
          <FormControlLabel
            control={<Checkbox onChange={StaySignedInChangeHandler} defaultChecked size="small" />}
            label="Keep me logged in"
          />
          {/* <Link className="login-form__forget-password" to="/">Forgot password?</Link> */}
        </div>
        <Button className="login-form__button" type="submit" content="LOGIN" />

        <Link className="button login-form__button register" to="/create-new-account">
          CREATE NEW ACCOUNT
        </Link>
      </form>
      <Button className="login-form__button" content="LOGINGoogle" onClick={LoginGoogle} />
    </Card>
  );
};

export default LoginPage;
