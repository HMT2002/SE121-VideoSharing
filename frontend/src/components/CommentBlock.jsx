import './CommentBlock.css';

import { useState } from 'react';

const CommentBlock = (props) => {
  const [comment, setComment] = useState(props.comment);

  return (
    <div className="comment-block">
      <div className="comment-user">{props.comment.user.username}</div> :{' '}
      <div className="comment-content">{props.comment.content}</div>
    </div>
  );
};
export default CommentBlock;
