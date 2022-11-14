export const getAllPosts = async () => {
  try {
    const response = await fetch(`http://localhost:4000/posts`, {
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

export const createNewPost = async (postData) => {
  try {
    const response = await fetch(`http://localhost:4000/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const likePostHandler = async (postId) => {
  try {
    const response = await fetch(`http://localhost:4000/likes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ PostId: postId }),
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};
