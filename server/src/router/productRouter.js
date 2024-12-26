const { handelGetAllProduct, handelDeleteProduct, handelUpdateProduct } = require('../controller/productController');
const { isLoggedIn, isAdmin } = require('../middleware/auth');
const { runValidation } = require('../validator');
const { validatePagination } = require('../validator/validatePagination');

const productRouter = require('express').Router();


productRouter.get("/", validatePagination, runValidation, handelGetAllProduct)
productRouter.delete("/:id", isLoggedIn, isAdmin, handelDeleteProduct)
productRouter.put("/:id", isAdmin, isLoggedIn, handelUpdateProduct)



module.exports = productRouter