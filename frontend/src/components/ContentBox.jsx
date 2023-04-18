import './ContentBox.css';

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ContentBox = (props) => {
  const [content, setContent] = useState(props.content);

  //console.log(content);
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);
  return (
    <div>
      <p>{content}</p>
    </div>
  );
};
export default ContentBox;
