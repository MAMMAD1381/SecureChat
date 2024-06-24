// utils
const CustomError = require('../utils/CustomError');
const logger = require('../utils/logger')

const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new CustomError('Not authorized to access this resource', 403));
        }

        logger.info(`user: ${req.user.username} authorized`)

        next();
    };
};

module.exports = authorize;
