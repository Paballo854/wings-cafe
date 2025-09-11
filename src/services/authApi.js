// frontend/src/services/authApi.js
import API from './api';

export const login = (credentials) => API.post('/auth/login', credentials);
export const logout = () => API.post('/auth/logout');
export const getCurrentUser = () => API.get('/auth/me');
export const register = (userData) => API.post('/auth/register', userData);