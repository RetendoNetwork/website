const mongoose = require('mongoose');
const logger = require('./logger');

const uri = 'mongodb://localhost:27017/retendo_account';

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        logger.database('MongoDB connected.');
    } catch (error) {
        logger.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;