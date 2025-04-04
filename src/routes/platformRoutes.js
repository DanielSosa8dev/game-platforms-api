const express = require('express');
const {
  getPlatforms,
  getPlatform,
  createPlatform,
  updatePlatform,
  deletePlatform,
} = require('../controllers/platformController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getPlatforms)
  .post(protect, admin, createPlatform);

router.route('/:id')
  .get(getPlatform)
  .put(protect, admin, updatePlatform)
  .delete(protect, admin, deletePlatform);

module.exports = router;