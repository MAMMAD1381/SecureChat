// utils
const CustomError = require('../../utils/CustomError');
const logger = require('../../utils/logger')

// models
const RequestAdmin = require('../../models/RequestAdmin');

const getAdminRequests = async (req, res, next) => {
  try {
    const user = req.user

    const existingRequests = await RequestAdmin.find({
      status: 'pending'
    });

    res.status(200).json({
      message: 'admin requests fetched successfully',
      requests: existingRequests
    });

    logger.info(`admin requests was requested by ${user.username}`)

  } catch (error) {
    next(new CustomError('Failed fetching admin requests', 500, error.message));
  }
};

module.exports = getAdminRequests;
