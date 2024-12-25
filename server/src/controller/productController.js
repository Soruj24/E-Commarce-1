const Product = require("../model/productModel")
const createError = require("http-errors")
const { successResponse } = require("./responesController")

const handelGetAllProduct = async (req, res, next) => {
    try {

        const product = await Product.find()
        if (!product) {
            throw createError(404, "Product not found")
        }

        return successResponse(res, {
            statusCode: 200,
            message: "users were returned Successfully",
            payload: {
                product
            },
        });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetAllProduct
}