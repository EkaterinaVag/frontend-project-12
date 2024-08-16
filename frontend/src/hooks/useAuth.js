import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { appRoutes } from '../routes';
import { getIsAuthenticated } from '../store/slices/authSelectors';

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) navigate(appRoutes.main);
    if (!isAuthenticated && location.pathname !== appRoutes.signup) {
      navigate(appRoutes.login);
    }
  }, [isAuthenticated, location.pathname, navigate]);
};

export default useAuth;
