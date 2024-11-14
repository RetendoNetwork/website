const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('../config.json');

const uri = config.database.account.connection_string;
const options = config.database.account.options;

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