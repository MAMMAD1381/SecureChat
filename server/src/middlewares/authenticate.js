const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomError = require('../utils/CustomError');

const authenticate = (method) => {
    return async (req, res, next) => {
        let token;

        if (!method) {
            return next(new CustomError('server error, authentication method not specified', 500, true));
        }

        if (method === 'cookie' && req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (method === 'Bearer' && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new CustomError('Not authorized, no token', 401, true));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.user._id).select('-password');

            if (!req.user) {
                return next(new CustomError('User not found', 404, true));
            }

            next();
        } catch (error) {
            return next(new CustomError('authentication failed', 500, true));
        }
    };
};

module.exports = authenticate;
