import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Card from './Card';
import './ThreadCard.css';

function ThreadCard(props) {
  const [title, setTitle] = useState(props.thread.title);
  const [user, setUser] = useState(props.thread.user);
  const [content, setContent] = useState(props.thread.content);
  const [thumbnail, setThumbnail] = useState(props.thread.video.thumbLink);

  const [slug, setSlug] = useState(props.thread.slug);

  const navigateSlug = useNavigate();

  const titleClickedHandler = () => {
    //setTitle('Updated!');
    console.log(title);
  };
  const cardClickedHandler = () => {
    console.log('Card ' + title + ' Clicked');
    navigateSlug('/threads/' + slug);
  };
  return (
    <Card onClick={cardClickedHandler}>
      <figure>
        <p>{title}</p>
        <p>{user.username}</p>
        <p>{content}</p>
        <img className="video-thumbnail" src={thumbnail} />
      </figure>
    </Card>
  );
}

export default ThreadCard;
