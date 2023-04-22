import './SignIn.css';

import React, { useCallback, useState, useEffect, useReducer, useContext } from 'react';
import { useNavigate, redirect } from 'react-router-dom';

import { SignInAction } from '../../actions/userActions';
import AuthContext from '../../store/auth-context';

const userReducer = (state, action) => {
  if (action.type === 'USER_INPUT_ACCOUNT') {
    return { value: action.val, isValid: true };
  }
  if (action.type === 'USER_INPUT_PASSWORD') {
    return { value: action.val, isValid: true };
  }
  if (action.type === 'USER_INPUT_PASSWORD_CONFIRM') {
    return { value: action.val, isValid: true };
  }
  if (action.type === 'USER_INPUT_USERNAME') {
    return { value: action.val, isValid: true };
  }
  if (action.type === 'USER_INPUT_EMAIL') {
    return { value: action.val, isValid: true };
  }
  return { value: '', isValid: false };
};

const SignIn = () => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const [accountState, dispatchAccount] = useReducer(userReducer, { value: '', isValid: false });
  const [passwordState, dispatchPassword] = useReducer(userReducer, { value: '', isValid: false });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const accountChangeHandler = (event) => {
    dispatchAccount({ type: 'USER_INPUT_ACCOUNT', val: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT_PASSWORD', val: event.target.value });
  };
  const submitChangeHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const userData = {
      account: accountState.value,
      password: passwordState.value,
    };

    const response = await SignInAction(userData);

    // localStorage.setItem('token', 'Bearer ' + response.token);

    console.log(response);
    if (response.status === 'fail') {
      setErrorMessage(response.message);
      console.log(errorMessage);
      return;
    }
    authCtx.login(response.token, response.role);

    dispatchAccount({ type: 'USER_INPUT_ACCOUNT', val: '' });
    dispatchPassword({ type: 'USER_INPUT_PASSWORD', val: '' });
    setErrorMessage('Signed in!');

    // localStorage.setItem('token', 'Bearer ' + response.token);
    // localStorage.setItem(
    //   'token',
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmVhOTFiNjAxODI2ZjEwZDk5N2EzMyIsImlhdCI6MTY4MDc5MDIyNywiZXhwIjoxNjg4NTY2MjI3fQ.WL1V8TcwSx5ArZzNVzAt5gSueGflyoVxzh6ebvFU6eQ'
    // );

    setIsLoading(false);
    navigate('/');
  };
  return (
    <React.Fragment>
      <form onSubmit={submitChangeHandler}>
        <input type="text" onChange={accountChangeHandler} />
        <input type="password" onChange={passwordChangeHandler} />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <input type="checkbox" name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
          <a href="/sign/forgot-pass">Forgot password?</a>
        </div>

        <button type="submit">Sign in</button>

        <div className="text-center">
          <p>
            Not a member? <a href="/sign/up">Register</a>
          </p>
          <p>or sign up with:</p>

          <div>
            <p>{errorMessage}</p>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SignIn;
