export const GETThreadAction = async (slug) => {
  if (!slug) {
    return { status: 'fail' };
  }
  // const storedToken = localStorage.getItem('token');
  const response = await fetch('/api/v1/threads/' + slug, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      // Authorization: token,
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

export const GETAllThreadsByUserAction = async (account, token) => {
  const response = await fetch('/api/v1/threads/content-creator/' + account, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.status || response.status === 'error') {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
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
};

export const POSTLargeVideoUploadAction = async (formData) => {
  if (!formData) {
    return { status: 'fail' };
  }
  const response = await fetch('/api/test/upload-video', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  // console.log(data);

  return data;
};

export const POSTLargeVideoMutilpartUploadAction = async (formData, index, chunkName, arrayChunkName, filename,ext) => {
  if (!formData) {
    return { status: 'fail' };
  }
  const response = await fetch('/api/test/upload-video-large-mutilpart', {
    method: 'POST',
    body: formData,
    headers: {
      type: 'blob',
      index: index,
      chunkname: chunkName,
      filename: filename,
      arrayChunkName,
      ext,
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
};

export const POSTLargeVideoMutilpartUploadConcatenateAction = async (arrayChunkName, filename, destination,ext) => {
  const response = await fetch('/api/test/upload-video-large-mutilpart-concatenate', {
    method: 'POST',
    body:JSON.stringify( {
      arraychunkname:arrayChunkName,
    }),
    headers: {
      'Content-Type': 'application/json',
      filename,
      destination,
      ext,
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
};

export const POSTLargeVideoMutilpartUploadConcatenateActionTest = async (arrayChunkName, filename, destination,ext) => {
  const response = await fetch('/api/test/upload-video-large-mutilpart-concatenate', {
    method: 'POST',
    body:JSON.stringify( {
      arraychunkname:arrayChunkName,
    }),
    headers: {
      'Content-Type': 'application/json',
      filename,
      destination,
      ext,
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
};


export const DELETEThreadAction = async (token, payload) => {
  try {
    const response = await fetch('/api/v1/threads/' + payload.thread.slug, {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const PATCHThreadUpdateAction = async (token, oldSlug, payload) => {
  try {
    const response = await fetch('/api/v1/threads/' + oldSlug, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GETAllThreadsByTitleAction = async (title) => {
  try {
    const response = await fetch('/api/v1/threads/search/' + title, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.status || response.status === 'error') {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GETAllThreadsByTagAction = async (tag) => {
  try {
    const response = await fetch('/api/v1/threads/tag/' + tag, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.status || response.status === 'error') {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GETAllThreadsByUserIdAction = async (id) => {
  try {
    const response = await fetch('/api/v1/threads/user/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.status || response.status === 'error') {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const threadAPIs = {
  GETThreadAction,
  GETAllThreadAction,
  GETAllThreadsByUserAction,
  GETAllThreadsByUserIdAction,
  GETAllThreadsByTitleAction,
  GETAllThreadsByTagAction,
  POSTThreadAction,
  POSTVideoUploadAction,
  DELETEThreadAction,
  PATCHThreadUpdateAction,
  POSTLargeVideoUploadAction,
  POSTLargeVideoMutilpartUploadAction,
  POSTLargeVideoMutilpartUploadConcatenateAction,
  POSTLargeVideoMutilpartUploadConcatenateActionTest,
};

export default threadAPIs;
