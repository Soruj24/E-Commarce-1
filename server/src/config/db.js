const mongoose = require('mongoose');
const colors = require('colors');
const { mongodb_url } = require('../secret');

const connectDB = async () => {
    try {
        // MongoDB connection string

        await mongoose.connect(mongodb_url);

        console.log(colors.green('MongoDB connected successfully!'));
    } catch (error) {
        console.error(colors.red('Error connecting to MongoDB:'), error);
        process.exit(1); // Exit process with failure code
    }
};

module.exports = connectDB;
