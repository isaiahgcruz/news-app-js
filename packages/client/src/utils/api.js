const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export default api;
