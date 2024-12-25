const { query } = require("express-validator");

const validatePagination = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),
    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),
    query("search")
        .optional()
        .isString()
        .withMessage("Search must be a string"),
    query("category")
        .optional()
        .isString()
        .withMessage("Category must be a string"),
];



module.exports = {
    validatePagination
}