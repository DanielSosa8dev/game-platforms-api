// game-platforms-api/src/controllers/platformController.js
const { Platform } = require('../models');

// @desc    Get all platforms
// @route   GET /api/platforms
// @access  Public
exports.getPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find({ active: true });
    res.status(200).json({
      success: true,
      count: platforms.length,
      data: platforms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Get platform by ID
// @route   GET /api/platforms/:id
// @access  Public
exports.getPlatform = async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);
    
    if (!platform) {
      return res.status(404).json({
        success: false,
        message: 'Platform not found',
      });
    }

    res.status(200).json({
      success: true,
      data: platform,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Create platform
// @route   POST /api/platforms
// @access  Private/Admin
exports.createPlatform = async (req, res) => {
  try {
    const platform = await Platform.create(req.body);
    
    res.status(201).json({
      success: true,
      data: platform,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Update platform
// @route   PUT /api/platforms/:id
// @access  Private/Admin
exports.updatePlatform = async (req, res) => {
  try {
    let platform = await Platform.findById(req.params.id);
    
    if (!platform) {
      return res.status(404).json({
        success: false,
        message: 'Platform not found',
      });
    }

    platform = await Platform.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: platform,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Delete platform
// @route   DELETE /api/platforms/:id
// @access  Private/Admin
exports.deletePlatform = async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);
    
    if (!platform) {
      return res.status(404).json({
        success: false,
        message: 'Platform not found',
      });
    }

    // Soft delete
    platform.active = false;
    await platform.save();

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
