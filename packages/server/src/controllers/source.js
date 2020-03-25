const sourceService = require('../services/source');

const index = async (req, res) => {
  try {
    const data = await sourceService.getSources();
    res.send(data);
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

const show = async (req, res) => {
  res.send([]);
};

module.exports = {
  index,
  show,
};
