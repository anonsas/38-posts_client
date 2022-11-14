export const login = async (username, password) => {
  try {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};
