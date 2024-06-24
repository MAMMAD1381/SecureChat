// utils
const CustomError = require('../../utils/CustomError');
const logger = require('../../utils/logger')

// models
const RequestAdmin = require('../../models/RequestAdmin');

const requestAdmin = async (req, res, next) => {
  try {
    const { username } = req.user;

    // Check if the user already has a pending or approved admin request
    const existingRequest = await RequestAdmin.findOne({
      username: username,
      status: 'pending'
    });

    if (existingRequest) {
      return next(new CustomError('You already have a pending or approved admin request', 400));
    }

    // Create a new admin request
    const newRequest = new RequestAdmin({
      username: username,
    });

    await newRequest.save();

    res.status(201).json({
      message: 'Admin request created successfully',
      request: newRequest
    });

    logger.info(`user: ${username} requested admin role`)

  } catch (error) {
    next(new CustomError('Failed to create admin request', 500, error.message));
  }
};

module.exports = requestAdmin;
