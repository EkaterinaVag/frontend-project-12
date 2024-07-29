import { Button, Form } from 'react-bootstrap';

const SignupForm = ({
  formik, t, registrationFailed, errorMessage,
}) => (
  <Form className="w-50" onSubmit={formik.handleSubmit}>
    <h1 className="text-center mb-4">{t('signupPage.header')}</h1>
    <Form.Group className="form-floating mb-3">
      <Form.Control
        placeholder={t('validate.max')}
        name="username"
        autoComplete="username"
        required
        id="username"
        onBlur={formik.handleBlur}
        isInvalid={
          (formik.touched.username && !!formik.errors.username)
          || registrationFailed
        }
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors.username}
      </Form.Control.Feedback>
      <Form.Label htmlFor="username">{t('signupPage.username')}</Form.Label>
    </Form.Group>
    <Form.Group className="form-floating mb-3">
      <Form.Control
        placeholder={t('validate.min')}
        name="password"
        required
        autoComplete="new-password"
        type="password"
        id="password"
        onBlur={formik.handleBlur}
        isInvalid={
          (formik.touched.password && !!formik.errors.password)
          || registrationFailed
        }
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors.password}
      </Form.Control.Feedback>
      <Form.Label htmlFor="password">{t('signupPage.password')}</Form.Label>
    </Form.Group>
    <Form.Group className="form-floating mb-4">
      <Form.Control
        placeholder={t('validate.confPass')}
        name="confirmPassword"
        required
        autoComplete="new-password"
        type="password"
        id="confirmPassword"
        onBlur={formik.handleBlur}
        isInvalid={
          (formik.touched.confirmPassword && !!formik.errors.confirmPassword)
          || registrationFailed
        }
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors.confirmPassword}
        {errorMessage}
      </Form.Control.Feedback>
      <Form.Label htmlFor="confirmPassword">
        {t('signupPage.confirmPassword')}
      </Form.Label>
    </Form.Group>
    <Button type="submit" className="w-100 mt-3" variant="outline-primary">
      {t('signupPage.registration')}
    </Button>
  </Form>
);

export default SignupForm;
