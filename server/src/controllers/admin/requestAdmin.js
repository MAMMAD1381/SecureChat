const User = require('../../models/User');
const RequestAdmin = require('../../models/RequestAdmin');
const CustomError = require('../../utils/CustomError');

const requestAdmin = async (req, res, next) => {
  try {
    const { username } = req.user;

    // Check if the user already has a pending or approved admin request
    const existingRequest = await RequestAdmin.findOne({
      username: username,
      status: { $in: ['pending', 'approved'] }
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
  } catch (error) {
    next(new CustomError('Failed to create admin request', 500, error.message));
  }
};

module.exports = requestAdmin;
