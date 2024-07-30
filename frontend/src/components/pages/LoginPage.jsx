import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormContainer from '../FormContainer';
import LoginFormContainer from '../loginForm/LoginFormContainer';

const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return <FormContainer FormComponent={LoginFormContainer} />;
};

export default LoginPage;
