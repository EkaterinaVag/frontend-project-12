import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { login } from '../slices/authSlice';
import { signupUrl } from '../routes';

const useSignup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const handleSubmit = async ({ username, password }) => {
    setRegistrationFailed(false);
    try {
      const newUser = { username, password };
      const res = await axios.post(signupUrl(), newUser);
      const { token } = res.data;
      dispatch(login({ token, username }));
      navigate('/');
    } catch (err) {
      if (err.isAxiosError && err.response.status === 409) {
        setErrorMessage(t('signupPage.error'));
        setRegistrationFailed(true);
      }
    }
  };

  return { handleSubmit, errorMessage, registrationFailed };
};

export default useSignup;
