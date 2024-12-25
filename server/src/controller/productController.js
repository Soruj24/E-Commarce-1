const { body, query, validationResult } = require("express-validator");
const Product = require("../model/productModel");
const createError = require("http-errors");
const { successResponse } = require("./responesController");
const { getFilterCriteria, getPaginationDetails } = require("../Helper/prodectHelper");
const { default: mongoose } = require("mongoose");




const handelGetAllProduct = async (req, res, next) => {
    try {
        // Validate the request query parameters using express-validator


        // Destructure and apply default values to query parameters
        const { page = 1, limit = 10, search = "", category = "" } = req.query;

        // Build filter criteria based on search and category
        const filterCriteria = getFilterCriteria({ search, category });

        // Calculate pagination skip and limit
        const { skip, limit: pageLimit } = getPaginationDetails({ page, limit });

        // Fetch products with the applied filters and pagination
        const products = await Product.find(filterCriteria)
            .skip(skip)
            .limit(pageLimit)
            .exec();

        // Count total matching products for pagination
        const totalProducts = await Product.countDocuments(filterCriteria);
        const totalPages = Math.ceil(totalProducts / pageLimit);

        if (!products || products.length === 0) {
            throw createError(404, "No products found matching your criteria");
        }

        // Return the success response with product data and pagination details
        return successResponse(res, {
            statusCode: 200,
            message: "Products retrieved successfully",
            payload: {
                products,
                pagination: {
                    currentPage: Number(page),
                    totalPages,
                    totalProducts,
                    perPage: pageLimit,
                },
            },
        });
    } catch (error) {
        next(error); // Pass error to next middleware
    }
};

const handelCreateProduct = async (req, res, next) => {
    try {

        const { title, price, description, category, } = req.body



    } catch (error) {
        next(error)
    }
}

const handelDeleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createError(400, "Invalid Product ID");
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw createError(404, "Product not found or already deleted");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Product deleted successfully",
            payload: {
                deletedProduct,
            },
        });
    } catch (error) {
        next(error); // এরর হ্যান্ডলারের কাছে পাঠানো
    }
};


const handelUpdateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createError(400, "Invalid Product ID");
        }

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            throw createError(404, "Product not found");
        }

        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        return successResponse(res, {
            statusCode: 200,
            message: "Product updated successfully",
            payload: {
                updatedProduct,
            },
        });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    handelGetAllProduct,
    handelDeleteProduct,
    handelUpdateProduct
};
