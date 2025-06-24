import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

export const getAllUsers = () => axios.get(`${API_URL}/api/users`);
export const getUserById = (userId) => axios.get(`${API_URL}/api/users/${userId}`);
export const updateProfile = (userId, updatedData, token) =>
  axios.put(`${API_URL}/api/users/${userId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
