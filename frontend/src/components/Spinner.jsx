import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';

const CustomSpinner = () => {
  const { t } = useTranslation();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '200px' }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t('loading')}</span>
      </Spinner>
    </div>
  );
};

export default CustomSpinner;
