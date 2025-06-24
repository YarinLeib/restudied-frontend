import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

export const createRequest = (itemId, token) =>
  axios.post(
    `${API_URL}/api/requests`,
    { itemId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getUserRequests = (token) =>
  axios.get(`${API_URL}/api/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateRequestStatus = (requestId, status, token) =>
  axios.patch(
    `${API_URL}/api/requests/${requestId}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
