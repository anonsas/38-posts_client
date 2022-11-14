export const userAuthentication = async () => {
  try {
    const response = await fetch('http://localhost:4000/auth/auth', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};
