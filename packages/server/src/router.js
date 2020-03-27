const router = require('express').Router();
const cacheConfig = require('./config/cache');

const cacheMiddleware = require('./middlewares/cache');
const sourceController = require('./controllers/source');

router.get(
  '/sources',
  cacheMiddleware(cacheConfig.GET_SOURCES_CACHE_DURATION),
  sourceController.index,
);
router.get(
  '/sources/:id',
  cacheMiddleware(cacheConfig.GET_SOURCE_CACHE_DURATION),
  sourceController.show,
);

module.exports = router;
