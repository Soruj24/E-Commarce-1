const createError = require('http-errors')
const { validationResult } = require('express-validator')


const runValidation = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(400, "Invalid query parameters", { errors: errors.array() }));
        }
        next()

    } catch (error) {
        next(error)
    }
}
module.exports = { runValidation }  