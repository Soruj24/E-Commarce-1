const { body, query, validationResult } = require("express-validator");
const Product = require("../model/productModel");
const createError = require("http-errors");
const { successResponse } = require("./responesController");



// Helper function for pagination and filtering logic
const getPaginationDetails = ({ page, limit }) => {
    const skip = (page - 1) * limit;
    return { skip, limit };
};

const getFilterCriteria = ({ search, category }) => {
    const filterCriteria = {};
    if (search) {
        filterCriteria.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }
    if (category) {
        filterCriteria.category = category; // Filter by category
    }
    return filterCriteria;
};

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

module.exports = {
    handelGetAllProduct,
};
