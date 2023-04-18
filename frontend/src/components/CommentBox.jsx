import './CommentBox.css';

import React, { useState, useEffect, useCallback, useContext } from 'react';

import CommentForm from './CommentForm';
import ListCommentBlock from './ListCommentBlock';

import { CheckTokenAction } from '../actions/userActions';
import { GETAllCommentAction, POSTCommentAction } from '../actions/commentActions';

import AuthContext from '../store/auth-context';
const CommentBox = (props) => {
  const [comments, setComments] = useState(<p>There is no comment</p>);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState('guest');
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  // console.log(props.thread);
  const loadingUserStatusHandler = useCallback(async () => {
    setIsLoading(true);

    //
    try {
      const data = await CheckTokenAction(authCtx.token);
      setUserStatus('Logged in as ' + authCtx.role);

      if (data.status === 'ok') {
        setIsLoggedIn(true);
        console.log(data);
      }
    } catch {
      setError(error.message);
    }
    //
    setIsLoading(false);
  }, []);

  const getCommentsHandler = async () => {
    const data = await GETAllCommentAction(props.thread.slug);
    console.log(data);
    if (data.status === 'ok') {
      if (data.data.length > 0) {
        setComments(<ListCommentBlock comments={data.data}></ListCommentBlock>);
      }
    }
  };

  const loadingCommentsHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await getCommentsHandler();
    } catch {
      setError(error.message);
    }
    //
    setIsLoading(false);
  }, [props.thread]);

  useEffect(() => {
    loadingUserStatusHandler();
  }, [loadingUserStatusHandler]);

  useEffect(() => {
    loadingCommentsHandler();
  }, [loadingCommentsHandler]);

  const postCommentHandler = async (comment) => {
    if (!props.thread) {
      throw new Error('No thread found: ' + comment.thread.slug);
    }

    const data = await POSTCommentAction(comment, authCtx.token);
    console.log(data);
  };
  const saveCommentDataHandler = async (comment, error) => {
    try {
      setIsLoading(true);
      if (error != null) {
        throw new Error(error);
      }
      await postCommentHandler(comment);
      await getCommentsHandler();
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <React.Fragment>
      <div>
        {!isLoading && !error && comments}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </div>
      <div>{userStatus}</div>
      <div>{props.thread._id}</div>

      <div>
        <CommentForm thread={props.thread} onSaveCommentData={saveCommentDataHandler} />
      </div>
    </React.Fragment>
  );
};
export default CommentBox;
