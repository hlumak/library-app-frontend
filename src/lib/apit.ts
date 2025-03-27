import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3042";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;