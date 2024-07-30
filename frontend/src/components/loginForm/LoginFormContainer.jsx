import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import image from '../../assets/image.jpg';
import RegistrationLink from './RegistrationLink';
import LoginForm from './LoginForm';

const LoginFormContainer = () => {
  const { t } = useTranslation();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={image} className="rounded-circle" alt={t('loginPage.img')} />
        </div>
        <LoginForm t={t} inputRef={inputRef} />
      </div>
      <RegistrationLink t={t} />
    </>
  );
};

export default LoginFormContainer;
