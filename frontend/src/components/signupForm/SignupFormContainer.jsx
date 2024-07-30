import React from 'react';
import { useTranslation } from 'react-i18next';

import SignupForm from './SignupForm';
import signupImg from '../../assets/signupImg.jpg';

const SignupFormContainer = () => {
  const { t } = useTranslation();

  return (
    <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
      <div>
        <img src={signupImg} className="rounded-circle" alt={t('signupPage.header')} />
      </div>
      <SignupForm t={t} />
    </div>
  );
};

export default SignupFormContainer;
