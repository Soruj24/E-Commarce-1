const slugify = require('slugify');
const { successResponse } = require('./responesController');
const createHttpError = require('http-errors');
const Category = require('../model/categoryModel');
const { default: mongoose } = require('mongoose');

const handelCreateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw createHttpError(400, "Category name is required");
        }

        const slug = slugify(name, { lower: true, strict: true });

        // Check if the category with the same slug already exists
        const existingCategory = await Category.findOne({ slug });
        if (existingCategory) {
            throw createHttpError(400, "Category already exists");
        }

        const category = await Category.create({ name, slug });

        return successResponse(res, {
            statusCode: 200,
            message: "Category created successfully",
            payload: {
                category,
            },
        });
    } catch (error) {
        next(error);
    }
};

const handelGetAllCategory = async (req, res, next) => {
    try {

        const categories = await Category.find({});
        if (!categories || categories.length === 0) {
            throw createHttpError(404, "No categories found")
        }

        return successResponse(res, {
            statusCode: 200,
            message: " All Category return successfully",
            payload: {
                categories,
            },
        });


    } catch (error) {
        next(error)
    }
}

const handelUpdateCategory = async (req, res, next) => {
    try {
        const categoryIdentifier = req.params.category; // Can be an ID or a slug
        const { name } = req.body;

        // Validate request body
        if (!name) {
            throw createHttpError(400, "Category name is required");
        }

        // Generate a new slug from the name
        const slug = slugify(name, { lower: true, strict: true });

        // Find and update category by ID or slug
        let category;
        if (/^[0-9a-fA-F]{24}$/.test(categoryIdentifier)) {
            // If the identifier is a valid ObjectId, update by ID
            category = await Category.findByIdAndUpdate(
                categoryIdentifier,
                { name, slug },
                { new: true, runValidators: true }
            );
        } else {
            // Otherwise, treat it as a slug and update
            category = await Category.findOneAndUpdate(
                { slug: categoryIdentifier },
                { name, slug },
                { new: true, runValidators: true }
            );
        }

        // Handle case where category is not found
        if (!category) {
            throw createHttpError(404, "Category not found");
        }

        // Return success response
        return successResponse(res, {
            statusCode: 200,
            message: "Category updated successfully",
            payload: {
                category,
            },
        });
    } catch (error) {
        next(error);
    }
};

const handelDeleteCategory = async (req, res, next) => {
    try {
        const categorySlug = req.params.category;

        if (!categorySlug) {
            throw createHttpError(400, "Category slug is required");
        }

        const category = await Category.findOneAndDelete({ slug: categorySlug });

        if (!category) {
            throw createHttpError(404, "Category not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Category deleted successfully",
            payload: {
                category,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handelCreateCategory,
    handelGetAllCategory,
    handelUpdateCategory,
    handelDeleteCategory
};
