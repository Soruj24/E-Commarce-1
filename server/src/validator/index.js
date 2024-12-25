const createError = require('http-errors');
const { validationResult } = require('express-validator');

const runValidation = (req, res, next) => {
    try {
        const errors = validationResult(req);

        // If there are validation errors, dynamically create the error message
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => `${error.param}: ${error.msg}`).join(", ");
            return next(createError(400, ` ${errorMessage}`, { errors: errors.array() }));
        }

        // Proceed to the next middleware if no validation errors
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = { runValidation };
