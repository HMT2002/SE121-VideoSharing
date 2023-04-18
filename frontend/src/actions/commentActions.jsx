const commentAction = () => {};
export const GETAllCommentAction = async (slug) => {
  if (!slug) {
    return { status: 'fail' };
  }
  const response = await fetch('/api/v1/threads/' + slug + '/comment', {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      // Authorization: storedToken,
    },
  });

  const data = await response.json();
  // console.log(dataComment);
  return data;
};

export const POSTCommentAction = async (comment, token) => {
  if (!comment) {
    return { status: 'fail' };
  }
  const response = await fetch('/api/v1/threads/' + comment.thread.slug + '/comment', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const data = await response.json();
  // console.log(response_data);
  return data;
};

export default commentAction;
