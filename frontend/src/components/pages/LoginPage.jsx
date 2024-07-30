import FormContainer from '../FormContainer';
import LoginFormContainer from '../loginForm/LoginFormContainer';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  useAuth();

  return <FormContainer FormComponent={LoginFormContainer} />;
};

export default LoginPage;
