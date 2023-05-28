export const isAuthenticated = () => {
  const token = sessionStorage.getItem('access_token');
  return token !== null && token !== undefined;
};