const apiPath = '/api/v1';

const signupUrl = () => [apiPath, 'signup'].join('/');

const loginUrl = () => [apiPath, 'login'].join('/');

export { signupUrl, loginUrl };
