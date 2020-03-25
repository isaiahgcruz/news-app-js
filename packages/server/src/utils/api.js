const axios = require('axios');

// TODO: Move somewhere
const API_URL = 'http://newsapi.org/v2';
const API_KEY = '8330c6bd3b1147b596368dd9272f889a';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

instance.interceptors.request.use((config) => ({
  ...config,
  params: {
    ...config.params,
    apiKey: API_KEY,
  },
}));

module.exports = instance;
