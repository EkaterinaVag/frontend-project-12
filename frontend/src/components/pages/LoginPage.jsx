import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios from 'axios';

import { login } from '../../slices/authSlice';
import { loginUrl } from '../../routes';
import image from '../../assets/image.jpg';
import RegistrationLink from '../RegistrationLink';
import LoginForm from '../LoginForm';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [authFailed, setAuthFailed] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(loginUrl(), values);
        const { token } = res.data;
        const { username } = res.data;
        dispatch(login({ token, username }));
        navigate('/');
      } catch {
        setAuthFailed(true);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={image}
                  className="rounded-circle"
                  alt={t('loginPage.img')}
                />
              </div>
              <LoginForm
                formik={formik}
                t={t}
                authFailed={authFailed}
                inputRef={inputRef}
              />
            </div>
            <RegistrationLink t={t} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
