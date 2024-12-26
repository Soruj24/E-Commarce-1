const { body } = require("express-validator");

const categoryValidate = [
    // Name validation: Should allow letters, spaces, and apostrophes (for names like O'Neill), with a minimum of 3 characters
    body("name")
        .isLength({ min: 3 })
        .withMessage(" Category Name must be at least 3 characters long"),




];

module.exports = { categoryValidate };
