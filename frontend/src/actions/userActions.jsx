export const SignInAction = async (userData) => {
  if (!userData) {
    return { status: 'fail' };
  }
  const response = await fetch('/api/v1/users/signin', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  // console.log(response_data);
  return data;
};
export const SignUpAction = async (userData) => {
  if (!userData) {
    return { status: 'fail' };
  }
  const response = await fetch('/api/v1/users/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
};

export const SignUpActionFormDataVersion = async (userFormData) => {
  if (!userFormData) {
    return { status: 'fail' };
  }
  const response = await fetch('/api/v1/users/signup', {
    method: 'POST',
    body: userFormData,
  });
  const data = await response.json();
  // console.log(data);
  return data;
};

export const CheckTokenAction = async (token) => {
  if (!token) {
    return { status: 'fail' };
  }
  const response = await fetch('/api/v1/auth/check-token', {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
};
