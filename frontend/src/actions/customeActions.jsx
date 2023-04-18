export const GETQuery = async (route, obj) => {
  const storedToken = localStorage.getItem('token');

  const response = await fetch(route, {
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

export const POSTQuery = async (route, obj) => {
  const response = await fetch(route, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
};
export const postThread = () => {};
