const mongoose = require('mongoose');
const RNIDSchema = require('./schema/rnid');
const config = require('../config.json');

const accountServerConfig = config.database.account;
const { connection_string } = accountServerConfig;
let accountServerDBConnection;
let RNID;

async function connect() {
    try {
        accountServerDBConnection = await mongoose.createConnection(connection_string);

        accountServerDBConnection.on('error', console.error.bind(console, 'Mongoose connection error:'));
        accountServerDBConnection.on('close', () => {
            accountServerDBConnection.removeAllListeners();
        });

        RNID = accountServerDBConnection.model('RNID', RNIDSchema);

        console.log('Connection to MongoDB successful');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = {
    connect,
    get RNID() {
        return RNID;
    }
};