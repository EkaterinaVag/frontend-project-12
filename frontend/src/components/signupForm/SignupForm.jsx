import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

import signupFormValidate from '../../signupFormValidate';
import SignupFormInput from './SignupFormInputs';
import useSignup from '../../hooks/useSignup';

const inputFields = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'validate.max',
    label: 'signupPage.username',
    autoComplete: 'username',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'validate.min',
    label: 'signupPage.password',
    autoComplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'validate.confPass',
    label: 'signupPage.confirmPassword',
    autoComplete: 'new-password',
  },
];

const SignupForm = ({ t }) => {
  const { handleSubmit } = useSignup();

  const formik = useFormik({
    validationSchema: signupFormValidate(t),
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signupPage.header')}</h1>
      {inputFields.map((field) => (
        <Form.Group className="form-floating mb-3" key={field.name}>
          <SignupFormInput formik={formik} t={t} field={field} />
        </Form.Group>
      ))}
      <Button type="submit" className="w-100 mt-3" variant="outline-primary">
        {t('signupPage.registration')}
      </Button>
    </Form>
  );
};

export default SignupForm;
