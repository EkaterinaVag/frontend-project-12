const getIsAuthenticated = (state) => state.auth.isAuthenticated;

const getUsername = (state) => state.auth.username;

const getToken = (state) => state.auth.token;

export { getIsAuthenticated, getToken, getUsername };
