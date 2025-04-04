const express = require('express');
const authRoutes = require('./authRoutes');
const platformRoutes = require('./platformRoutes');
const gameRoutes = require('./gameRoutes');

const router = express.Router();

// Explicitly check route module exports
console.log('authRoutes:', authRoutes);
console.log('platformRoutes:', platformRoutes);
console.log('gameRoutes:', gameRoutes);

// Validate route modules
if (!authRoutes || typeof authRoutes.use !== 'function') {
  throw new Error('Invalid authRoutes');
}
if (!platformRoutes || typeof platformRoutes.use !== 'function') {
  throw new Error('Invalid platformRoutes');
}
if (!gameRoutes || typeof gameRoutes.use !== 'function') {
  throw new Error('Invalid gameRoutes');
}

// API routes
router.use('/api/auth', authRoutes);
router.use('/api/platforms', platformRoutes);
router.use('/api/games', gameRoutes);

module.exports = router;