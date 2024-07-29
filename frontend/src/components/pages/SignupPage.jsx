import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { login } from '../../slices/authSlice';
import { signupUrl } from '../../routes';
import signupImg from '../../assets/signupImg.jpg';
import SignupForm from '../SignupForm';

const SignupPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [errorMessage, setErrorMessage] = useState(null);
  const [registrationFailed, setRegistrationFailed] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const shrema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('validate.max'))
      .max(20, t('validate.max'))
      .required(t('validate.required')),
    password: yup
      .string()
      .min(3, t('validate.min'))
      .required(t('validate.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validate.confPass'))
      .required(t('validate.required')),
  });

  const formik = useFormik({
    validationSchema: shrema,
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ username, password }) => {
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
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signupImg}
                  className="rounded-circle"
                  alt={t('signupPage.header')}
                />
              </div>
              <SignupForm
                formik={formik}
                t={t}
                registrationFailed={registrationFailed}
                errorMessage={errorMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
