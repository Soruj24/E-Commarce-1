const { handelCreateCategory, handelGetAllCategory, handelDeleteCategory, handelUpdateCategory } = require("../controller/categoryController");

const categoryRouter = require("express").Router();

categoryRouter.post('/', handelCreateCategory)
categoryRouter.get('/', handelGetAllCategory)
categoryRouter.put('/:category', handelUpdateCategory)
categoryRouter.delete('/:category', handelDeleteCategory)



module.exports = categoryRouter