const mongoose = require('mongoose');

// Define the schema for the product model
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category is Miss"],
        trim: true,
        minlength: [3, "the length of user name can be minimum 3 characters"],
        maxlength: [31, "the length of user name can be maximum 31 characters"],
        unique: true
    },
    slug: {
        type: String,
        required: [true, "Category is Miss"],
        trim: true,
        minlength: [3, "the length of user name can be minimum 3 characters"],
        maxlength: [31, "the length of user name can be maximum 31 characters"],
        unique: true
    },

}, { timestamps: true });

// Create the model
const Category = mongoose.model(' Category', categorySchema);

module.exports = Category;
