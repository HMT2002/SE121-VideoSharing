import './CommentForm.css';

import React, { useState, useEffect, useCallback } from 'react';

const CommentForm = (props) => {
  const [enteredComment, setEnteredComment] = useState('');
  const [commentThread, setCommentThread] = useState(props.thread);

  const commentChangeHandler = (event) => {
    //console.log(event.target);
    //console.log(event.target.value);

    setEnteredComment(event.target.value);
  };
  const submitChangeHandler = async (event) => {
    event.preventDefault();
    let error = null;

    if (enteredComment === '') {
      error = 'Missing information';
      return;
    }
    const commentData = {
      content: enteredComment,
      createDate: Date.now(),
      thread: props.thread,
    };

    // const storedToken = localStorage.getItem('token');
    // console.log(props.thread);
    // if (!props.thread) {
    //   throw new Error('No thread found: ' + props.thread.slug);
    // }

    // const response = await fetch('/api/v1/threads/' + props.thread.slug + '/comment', {
    //   method: 'POST',
    //   body: JSON.stringify(commentData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: storedToken,
    //   },
    // });
    // const response_data = await response.json();
    // console.log(response_data);

    props.onSaveCommentData(commentData, error);

    setEnteredComment('');
  };
  return (
    <div>
      <form onSubmit={submitChangeHandler}>
        <textarea
          className="main-comment-editor"
          autoComplete="discourse"
          placeholder="Type here. Use Markdown, BBCode, or HTML to format. Drag or paste images."
          onChange={commentChangeHandler}
          value={enteredComment}
        ></textarea>
        <div className="new-comment__actions">
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
