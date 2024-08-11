const appRoutes = {
  main: '/',
  login: '/login',
  signup: '/signup',
  notFound: '*',
};

const apiRoutes = {
  apiPath: '/api/v1',
  loginPath: 'login',
  signupPath: 'signup',
};

const signupUrl = () => [apiRoutes.apiPath, apiRoutes.signupPath].join('/');

const loginUrl = () => [apiRoutes.apiPath, apiRoutes.loginPath].join('/');

export { signupUrl, loginUrl, appRoutes };
