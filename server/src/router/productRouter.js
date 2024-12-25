const { handelGetAllProduct, handelDeleteProduct, handelUpdateProduct } = require('../controller/productController');
const { runValidation } = require('../validator');
const { validatePagination } = require('../validator/validatePagination');

const productRouter = require('express').Router();


productRouter.get("/", validatePagination, runValidation, handelGetAllProduct)
productRouter.delete("/:id", handelDeleteProduct)
productRouter.put("/:id", handelUpdateProduct)



module.exports = productRouter