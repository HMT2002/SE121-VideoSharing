export const GETThreadAction = async (slug) => {
  if (!slug) {
    return { status: 'fail' };
  }
  // const storedToken = localStorage.getItem('token');
  const response = await fetch('/api/v1/threads/' + slug, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      // Authorization: storedToken,
    },
  });
  if (!response.status || response.status === 'error') {
    throw new Error('Something went wrong!');
  }
  const data = await response.json();
  //   console.log(data);
  return data;
};

export const GETAllThreadAction = async () => {
  const storedToken = localStorage.getItem('token');
  const response = await fetch('/api/v1/threads', {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: storedToken,
    },
  });
  if (!response.status || response.status === 'error') {
    throw new Error('Something went wrong!');
  }
  const data = await response.json();
  //   console.log(data);
  return data;
};
export const POSTThreadAction = async (thread, token) => {
  if (!thread) {
    return { status: 'fail' };
  }

  const response = await fetch('/api/v1/threads', {
    method: 'POST',
    body: JSON.stringify(thread),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
};

export const POSTVideoUploadAction = async (formData) => {
  if (!formData) {
    return { status: 'fail' };
  }
  const response = await fetch('/api/v1/threads/upload-video', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  // console.log(data);

  return data;
};
