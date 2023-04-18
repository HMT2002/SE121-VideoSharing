import './ListThreadCard.css';
import React, { useState } from 'react';

import ThreadCard from './ThreadCard';

function ListThreadCard(props) {
  const [list, setList] = useState(props.threads);

  let threadsContent = <p>No more thread</p>;

  if (list.length > 0) {
    threadsContent = list.map((thread, index) => <ThreadCard key={index} thread={thread} />);
  }
  //console.log(list);
  return <div>{threadsContent}</div>;
}

export default ListThreadCard;
