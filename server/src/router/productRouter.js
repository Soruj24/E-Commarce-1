const { handelGetAllProduct } = require('../controller/productController');

const productRouter = require('express').Router();


productRouter.get("/", handelGetAllProduct)


module.exports = productRouter