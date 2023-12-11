// src/helpers.js
export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token ? `${token}` : '';
  };
  