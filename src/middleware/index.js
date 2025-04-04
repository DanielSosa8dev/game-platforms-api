// game-platforms-api/src/middleware/index.js
const errorHandler = require('./error');
const { protect, admin } = require('./auth');

module.exports = {
  errorHandler,
  protect,
  admin,
};