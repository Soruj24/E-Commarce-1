const { handelCreateCategory, handelGetAllCategory, handelDeleteCategory, handelUpdateCategory } = require("../controller/categoryController");
const { isAdmin, isLoggedIn } = require("../middleware/auth");
const { runValidation } = require("../validator");
const { categoryValidate } = require("../validator/categoryValidator");

const categoryRouter = require("express").Router();

categoryRouter.post('/', isLoggedIn, categoryValidate, runValidation, isAdmin, handelCreateCategory)
categoryRouter.get('/', handelGetAllCategory)
categoryRouter.put('/:category', isLoggedIn, isAdmin, handelUpdateCategory)
categoryRouter.delete('/:category', isLoggedIn, isAdmin, handelDeleteCategory)



module.exports = categoryRouter