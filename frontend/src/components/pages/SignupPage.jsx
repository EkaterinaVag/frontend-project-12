import FormContainer from '../FormContainer';
import SignupFormContainer from '../signupForm/SignupFormContainer';
import useAuth from '../../hooks/useAuth';

const SignupPage = () => {
  useAuth();

  return <FormContainer FormComponent={SignupFormContainer} />;
};

export default SignupPage;
