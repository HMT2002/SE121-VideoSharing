import './ControlPanel.css';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { CheckTokenAction } from '../actions/userActions';
import AuthContext from '../store/auth-context';

function ControllPanel(props) {
  const [userImage, setUserImage] = useState('');

  const [userAuthority, setUserAuthority] = useState('');

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();

  const logOutHandler = useCallback(() => {
    authCtx.logout();

    navigate('/');
  }, []);

  const fetchAuth = useCallback(async () => {
    try {
      const data = await CheckTokenAction(authCtx.token);

      console.log(data);
      if (data.status === 'fail') {
        return;
      }

      if (data.user) {
        setUserImage(<img className="user-image" src={data.user.photo.link} />);
      }
    } catch (error) {
      // console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  return (
    <React.Fragment>
      <div className="menu menu--structural" data-menu="menu" aria-hidden="true">
        <div className="user-info">{userImage}</div>
        <div className="menu-content">
          <ul className="p-sectionLinks-list">
            <li>
              <a href="/whats-new/posts/">New thead</a>
            </li>
            <li>
              <a href="/find-threads">Find threads</a>
            </li>
            {authCtx.role === 'content-creator' && (
              <li>
                <a href="/your-threads/">Your threads</a>
              </li>
            )}
            {authCtx.role === 'content-creator' && (
              <li>
                <a href="/create-thread/">Create new thread</a>
              </li>
            )}

            {(authCtx.role === 'content-creator' || authCtx.role === 'user') && (
              <li>
                <a href="/stared">Your starred threads</a>
              </li>
            )}
            {(authCtx.role === 'content-creator' || authCtx.role === 'user') && (
              <li>
                <a href="/contributed">Threads with your posts</a>
              </li>
            )}
            {(authCtx.role === 'content-creator' || authCtx.role === 'user') && (
              <li>
                <a href="/unanswered-threads">Unanswered threads</a>
              </li>
            )}
            {authCtx.role === 'admin' && (
              <li>
                <a href="/admin">You are the admin</a>
              </li>
            )}

            {authCtx.role === 'guest' && (
              <li>
                <a href="/sign/in">Sign in</a>
              </li>
            )}
            {authCtx.role === 'guest' && (
              <li>
                <a href="/sign/up">Sign up</a>
              </li>
            )}
            {authCtx.role !== 'guest' && (
              <li>
                <a href="/" onClick={logOutHandler}>
                  Sign out
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ControllPanel;
