// game-platforms-api/src/config/index.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '1d',
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoDb: process.env.MONGO_DB || 'games',
  mongoCollection: process.env.MONGO_COLLECTION || 'games',
};
