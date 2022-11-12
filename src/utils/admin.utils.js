export const getAllUsers = async () => {
  try {
    const response = await fetch('http://localhost:4000/admin');
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:4000/admin/${userId}`, {
      method: 'Delete',
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};
