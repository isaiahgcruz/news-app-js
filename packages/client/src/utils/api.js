const axios = require('axios');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export default api;
