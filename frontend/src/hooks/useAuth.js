import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);
};

export default useAuth;
