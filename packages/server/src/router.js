const router = require('express').Router();

const cacheMiddleware = require('./middlewares/cache');
const sourceController = require('./controllers/source');

router.get('/sources', cacheMiddleware(60), sourceController.index);
router.get('/sources/:id', cacheMiddleware(15), sourceController.show);

module.exports = router;
