import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

export const getAllItems = () => axios.get(`${API_URL}/api/items`);
export const getItemById = (id) => axios.get(`${API_URL}/api/items/${id}`);
export const createItem = (data, token) =>
  axios.post(`${API_URL}/api/items`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateItem = (id, data, token) =>
  axios.put(`${API_URL}/api/items/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteItem = (id, token) =>
  axios.delete(`${API_URL}/api/items/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
