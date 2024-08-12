import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    if (!isAuthenticated) {
      if (location.pathname !== '/signup') {
        navigate('/login');
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);
};

export default useAuth;
