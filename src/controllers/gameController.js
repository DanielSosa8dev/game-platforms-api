// game-platforms-api/src/controllers/gameController.js
const { Game } = require('../models');

// @desc    Get all games
// @route   GET /api/games
// @access  Public
exports.getGames = async (req, res) => {
  try {
    let query = { active: true };
    
    // Filter by platform if provided
    if (req.query.platform) {
      query.platform = req.query.platform;
    }

    const games = await Game.find(query).populate('platform', 'name logoUrl');
    
    res.status(200).json({
      success: true,
      count: games.length,
      data: games,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Get game by ID
// @route   GET /api/games/:id
// @access  Public
exports.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('platform', 'name logoUrl');
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Create game
// @route   POST /api/games
// @access  Private/Admin
exports.createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    
    res.status(201).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Update game
// @route   PUT /api/games/:id
// @access  Private/Admin
exports.updateGame = async (req, res) => {
  try {
    let game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Delete game
// @route   DELETE /api/games/:id
// @access  Private/Admin
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    // Soft delete
    game.active = false;
    await game.save();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};