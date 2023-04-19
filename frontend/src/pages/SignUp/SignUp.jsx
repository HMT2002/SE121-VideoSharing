import './SignUp.css';

import React, { Fragment, useState, useReducer, useEffect } from 'react';
import { useNavigate, redirect } from 'react-router-dom';

import Card from '../../components/Card';
import defaultProfilePhoto from '../../resources/defaultProfilePhoto.jpg';

import { SignUpAction, SignUpActionFormDataVersion } from '../../actions/userActions';

const userReducer = (state, action) => {
  if (action.type === 'USER_INPUT_ACCOUNT') {
    return { value: action.val, isValid: action.val.trim().length > 5 };
  }
  if (action.type === 'USER_INPUT_PASSWORD') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 5,
    };
  }
  if (action.type === 'USER_INPUT_PASSWORD_CONFIRM') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 5,
    };
  }
  if (action.type === 'USER_INPUT_USERNAME') {
    return { value: action.val, isValid: action.val.trim().length > 5 };
  }
  if (action.type === 'USER_INPUT_EMAIL') {
    return { value: action.val, isValid: action.val.trim().length > 5 && action.val.includes('@') };
  }
  return { value: '', isValid: false };
};
const SignUp = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountState, dispatchAccount] = useReducer(userReducer, { value: '', isValid: false });
  const [passwordState, dispatchPassword] = useReducer(userReducer, { value: '', isValid: false });
  const [passwordConfirmState, dispatchPasswordConfirm] = useReducer(userReducer, { value: '', isValid: false });
  const [usernameState, dispatchUsername] = useReducer(userReducer, { value: '', isValid: false });
  const [emailState, dispatchEmail] = useReducer(userReducer, { value: '', isValid: false });
  const [isFormValid, setIsFormValid] = useState(false);
  const [photoState, setPhoto] = useState(defaultProfilePhoto);
  const [photoPreviewState, setPhotoPreview] = useState(defaultProfilePhoto);

  const accountChangeHandler = (event) => {
    dispatchAccount({ type: 'USER_INPUT_ACCOUNT', val: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT_PASSWORD', val: event.target.value });
  };
  const passwordConfirmChangeHandler = (event) => {
    dispatchPasswordConfirm({
      type: 'USER_INPUT_PASSWORD_CONFIRM',
      val: event.target.value,
    });
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT_EMAIL', val: event.target.value });
  };
  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: 'USER_INPUT_USERNAME', val: event.target.value });
  };

  const { isValid: accountIsValid } = accountState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: passwordConfirmIsValid } = passwordConfirmState;
  const { isValid: usernameIsValid } = usernameState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setIsFormValid(
        accountIsValid &&
          emailIsValid &&
          passwordIsValid &&
          passwordConfirmIsValid &&
          usernameIsValid &&
          passwordState.value.trim() === passwordConfirmState.value.trim()
      );
      console.log(isFormValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [accountIsValid, emailIsValid, passwordIsValid, passwordConfirmIsValid, usernameIsValid]);

  const submitChangeHandler = async (event) => {
    setIsLoading(true);
    if (!isFormValid) {
      setErrorMessage('Please check all the information format!');
      return;
    }
    event.preventDefault();

    try {
      // const userData = {
      //   account: accountState.value.trim(),
      //   username: usernameState.value.trim(),
      //   password: passwordState.value.trim(),
      //   passwordConfirm: passwordConfirmState.value.trim(),
      //   email: emailState.value.trim(),
      //   role: 'user',
      //   myFile: photoState,
      // };

      // const data = await SignUpAction(userData);

      const userFormData = new FormData();
      userFormData.set('account', accountState.value.trim());
      userFormData.set('username', usernameState.value.trim());
      userFormData.set('password', passwordState.value.trim());
      userFormData.set('passwordConfirm', passwordConfirmState.value.trim());
      userFormData.set('email', emailState.value.trim());
      userFormData.set('role', 'user');
      userFormData.append('myFile', photoState);

      const data = await SignUpActionFormDataVersion(userFormData);

      if (data.status === 'error' || data.status === 'fail') {
        setErrorMessage('Username, Email or Account has been used');
        return;
      }

      dispatchAccount({ type: 'USER_INPUT_ACCOUNT', val: '' });
      dispatchEmail({ type: 'USER_INPUT_EMAIL', val: '' });
      dispatchPassword({ type: 'USER_INPUT_PASSWORD', val: '' });
      dispatchPasswordConfirm({ type: 'USER_INPUT_PASSWORD_CONFIRM', val: '' });
      dispatchUsername({ type: 'USER_INPUT_USERNAME', val: '' });

      localStorage.setItem('token', 'Bearer ' + data.token);

      setIsLoading(false);
      navigate('/');
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const registerDataChange = (event) => {
    if (event.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // setPhotoPreview(reader.result);
          // console.log('reader.result: ');
          // console.log(photoPreviewState);

          setPhotoPreview(reader.result);
          console.log('reader.result: ');
          console.log(reader.result);
        }
      };

      reader.readAsDataURL(event.target.files[0]);

      setPhoto(event.target.files[0]);
      console.log('event.target.files[0]: ');
      console.log(photoState);
    } else {
      setPhoto(event.target.value);
    }
  };
  return (
    <Fragment>
      <h1>Sign Up</h1>
      <div>
        <form onSubmit={submitChangeHandler}>
          <div className="enter-field ">
            <label>Account</label>
            <input type="text" onChange={accountChangeHandler} />
          </div>

          <div className="enter-field">
            <label>Password</label>

            <input type="password" onChange={passwordChangeHandler} />
          </div>

          <div className="enter-field">
            <label>Re-enter password</label>

            <input type="password" onChange={passwordConfirmChangeHandler} />
          </div>

          <div className="enter-field">
            <label>Email</label>

            <input type="text" onChange={emailChangeHandler} />
          </div>

          <div className="enter-field">
            <label>Choose Username</label>

            <input type="text" onChange={usernameChangeHandler} />
          </div>
          <div id="choose-image">
            <img className="choose-image-preview" src={photoPreviewState} />

            <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
          </div>
          <button type="submit" disabled={!isFormValid}>
            Register
          </button>
        </form>
      </div>
      <div>{errorMessage}</div>
      {!isFormValid && <div>form is not valid</div>}
      {isFormValid && <div>form is valid</div>}
    </Fragment>
  );
};

export default SignUp;
