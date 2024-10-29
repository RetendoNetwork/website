const mongoose = require('mongoose');

const RNIDSchema = new mongoose.Schema({
	pid: {
		type: Number,
		unique: true
	},
	server_access_level: String,
	access_level: Number,
	username: String,
	connections: {
		stripe: {
			customer_id: String,
			subscription_id: String,
			price_id: String,
			tier_level: Number,
			tier_name: String,
			latest_webhook_timestamp: Number
		}
	}
});

module.exports = RNIDSchema;