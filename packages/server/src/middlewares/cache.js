const memoryCache = require('memory-cache');

/**
 * Caches the route
 *
 * @param {number} duration - in minutes
 *
 * @return {function} middleware
 */
const cacheMiddleware = (duration) => (req, res, next) => {
  const key = req.url;
  const cache = memoryCache.get(key);

  if (cache) {
    res.send(cache);
  } else {
    res.newSend = res.send;
    res.send = (body) => {
      if (res.statusCode <= 299) {
        memoryCache.put(key, body, duration * 60 * 1000);
      }
      res.newSend(body);
    };
    next();
  }
};

module.exports = cacheMiddleware;
