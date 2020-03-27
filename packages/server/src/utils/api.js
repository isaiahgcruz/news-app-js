const axios = require('axios');
const apiConfig = require('../config/api');

const instance = axios.create({
  baseURL: apiConfig.URL,
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
    apiKey: apiConfig.KEY,
  },
}));

module.exports = instance;
