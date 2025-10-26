import axios from 'axios';

// Prefer env var, fall back to localhost:5000.
// Works in SSR and browser.
const defaultBase = 'http://localhost:5000/api';
const browserBase = () => {
  if (typeof window === 'undefined') return undefined;
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:5000/api`;
};

const baseURL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  browserBase() ||
  defaultBase;

const api = axios.create({ baseURL });

// Automatically attach JWT if available (client-side only)
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
