import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// To wrap App.js Component.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [authUser, setAuthUser] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthUser('');
        } else {
          setAuthUser({
            id: response.data.id,
            username: response.data.username,
            status: true,
          });
        }
      });
  }, [setAuthUser]);

  // const login = (user) => {
  //   setUser(user);
  // };

  // const logout = () => {
  //   setUser(null);
  // };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// To use it in components.
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
