import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { login } from '../store/slices/authSlice';
import { appRoutes, loginUrl } from '../routes';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  const handleSubmit = async (values) => {
    setAuthFailed(false);
    try {
      const res = await axios.post(loginUrl(), values);
      const { token, username } = res.data;
      dispatch(login({ token, username }));
      navigate(appRoutes.main);
    } catch {
      setAuthFailed(true);
    }
  };

  return { handleSubmit, authFailed };
};

export default useLogin;
