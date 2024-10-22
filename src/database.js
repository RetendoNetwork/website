const mongoose = require('mongoose');
const RNIDSchema = require('./schema/rnid');
const config = require('../website-config.json');

const accountServerConfig = config.database.account;
const { connection_string, options } = accountServerConfig;
let accountServerDBConnection;
let RNID;

async function connect() {
    accountServerDBConnection = await mongoose.createConnection(connection_string, options);
    accountServerDBConnection.on('error', console.error.bind(console, 'Mongoose connection error:'));
    accountServerDBConnection.on('close', () => {
        accountServerDBConnection.removeAllListeners();
    });

    await accountServerDBConnection.asPromise();

    RNID = accountServerDBConnection.model('RNID', RNIDSchema);

    module.exports.RNID = RNID;
}

module.exports = {
    connect,
    RNID
};