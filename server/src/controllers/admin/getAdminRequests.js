const User = require('../../models/User');
const RequestAdmin = require('../../models/RequestAdmin');
const CustomError = require('../../utils/CustomError');

const getAdminRequests = async (req, res, next) => {
  try {

    const existingRequests = await RequestAdmin.find({
      status: { $in: ['pending', 'approved'] }
    });

    res.status(200).json({
      message: 'admin requests fetched successfully',
      requests: existingRequests
    });
  } catch (error) {
    next(new CustomError('Failed fetching admin requests', 500, error.message));
  }
};

module.exports = getAdminRequests;
