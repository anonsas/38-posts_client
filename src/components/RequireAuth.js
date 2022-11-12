import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RequireAuth = ({ Component, children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (auth.user.role !== 'admin') {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
