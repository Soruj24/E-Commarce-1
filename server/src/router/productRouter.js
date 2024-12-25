const { handelGetAllProduct } = require('../controller/productController');
const { runValidation } = require('../validator');
const { validatePagination } = require('../validator/validatePagination');

const productRouter = require('express').Router();


productRouter.get("/", validatePagination, runValidation, handelGetAllProduct)



module.exports = productRouter