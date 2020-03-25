const router = require('express').Router();

const sourceController = require('./controllers/source');

router.get('/sources', sourceController.index);
router.get('/sources/:id', sourceController.show);

module.exports = router;
