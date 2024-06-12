const CustomError = require('../utils/CustomError');

const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new CustomError('Not authorized to access this resource', 403));
        }
        next();
    };
};

module.exports = authorize;
