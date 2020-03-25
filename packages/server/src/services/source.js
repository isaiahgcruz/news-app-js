const api = require('../utils/api');

const getSources = async () => {
  try {
    const { data } = await api.get('/sources');

    return data;
  } catch (e) {
    throw new Error(e);
  }
};

const getArticles = async () => {
  // console.log(sourceId);
  return [];
};

module.exports = {
  getSources,
  getArticles,
};
