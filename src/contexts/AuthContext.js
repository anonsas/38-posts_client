import { useState, useLayoutEffect, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// To wrap App.js Component.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useLayoutEffect(() => {
    axios
      .get('http://localhost:4000/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setUser({});
        } else {
          setUser({
            id: response.data.id,
            username: response.data.username,
            role: response.data.role,
            status: true,
          });
        }
      });
  }, []);

  const login = (user) => setUser(user);
  const logout = () => setUser({});

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// To use it in components. Like (customHook)
export const useAuth = () => {
  return useContext(AuthContext);
};
