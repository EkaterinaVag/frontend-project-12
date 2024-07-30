import { Form } from 'react-bootstrap';
import useSignup from '../../hooks/useSignup';

const SignupFormInput = ({ formik, t, field }) => {
  const { errorMessage, registrationFailed } = useSignup();
  return (
    <>
      <Form.Control
        placeholder={field.placeholder}
        name={field.name}
        type={field.type}
        required
        autoComplete={field.autoComplete}
        id={field.name}
        onBlur={formik.handleBlur}
        isInvalid={
          (formik.touched[field.name] && !!formik.errors[field.name])
          || registrationFailed
        }
        onChange={formik.handleChange}
        value={formik.values[field.name]}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors[field.name]}
        {errorMessage}
      </Form.Control.Feedback>
      <Form.Label htmlFor={field.name}>{t(field.label)}</Form.Label>
    </>
  );
};

export default SignupFormInput;
