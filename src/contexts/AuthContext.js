import { useState, useLayoutEffect, createContext, useContext } from 'react';
import { userAuthentication } from '../utils/user.utils';

const AuthContext = createContext();

// To wrap App.js Component.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const login = (user) => setUser(user);
  const logout = () => setUser({});

  useLayoutEffect(() => {
    (async () => {
      const response = await userAuthentication();
      if (response.error) setUser({});
      else {
        setUser({
          id: response.id,
          username: response.username,
          role: response.role,
          status: true,
        });
      }
    })();
  }, []);

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
