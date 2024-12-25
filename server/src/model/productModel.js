const mongoose = require('mongoose');

// Define the schema for the product model
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        rate: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        count: {
            type: Number,
            required: true,
        },
    },
});

// Create the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
