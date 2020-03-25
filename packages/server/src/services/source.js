const { v4: uuid } = require('uuid');
const api = require('../utils/api');

const getSources = async () => {
  try {
    const { data } = await api.get('/sources');

    return data;
  } catch (e) {
    throw new Error(e);
  }
};

const getSourceById = async (id, page, pageSize) => {
  try {
    const params = {
      sources: id,
      page,
      pageSize,
    };
    const { data } = await api.get('/everything', { params });

    return {
      id,
      ...data,
      articles: data.articles.map((article) => ({
        id: uuid(),
        ...article,
      })),
    };
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getSources,
  getSourceById,
};
