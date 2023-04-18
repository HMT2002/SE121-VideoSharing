import './ListCommentBlock.css';
import React, { Fragment, useState } from 'react';

import CommentBlock from './CommentBlock';
const ListCommentBlock = (props) => {
  const [list, setList] = useState(props.comments);

  let commentsContent = <p>There is no comment</p>;

  if (list.length > 0) {
    commentsContent = list.map((comment, index) => <CommentBlock key={index} comment={comment} />);
  }
  //console.log(list);
  return <Fragment>{commentsContent}</Fragment>;
};

export default ListCommentBlock;
