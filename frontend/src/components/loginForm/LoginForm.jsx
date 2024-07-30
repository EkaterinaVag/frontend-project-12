import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import useLogin from '../../hooks/useLogin';

const LoginForm = ({ t, inputRef }) => {
  const { handleSubmit, authFailed } = useLogin();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: handleSubmit,
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <fieldset>
        <h1 className="text-center mb-4">{t('buttons.login')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="username"
            autoComplete="username"
            required
            placeholder={t('loginPage.username')}
            id="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            isInvalid={authFailed}
            ref={inputRef}
          />
          <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            name="password"
            autoComplete="current-password"
            required
            placeholder={t('loginPage.password')}
            type="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={authFailed}
          />
          <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {t('loginPage.error')}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary" className="w-100 mb-3">
          {t('buttons.login')}
        </Button>
      </fieldset>
    </Form>
  );
};

export default LoginForm;
