import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const verify = (token) =>
  axios.get(`${API_URL}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
