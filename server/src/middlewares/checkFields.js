const CustomError = require('../utils/CustomError');

const checkFields = (fields) => {
    return (req, res, next) => {
        const missingFields = fields.filter(field => !req.body.hasOwnProperty(field));

        if (missingFields.length > 0) {
            return next(new CustomError(`Missing required fields: ${missingFields.join(', ')}`));
        }

        next();
    };
};

module.exports = checkFields;
