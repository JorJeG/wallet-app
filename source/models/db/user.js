const mongoose = require('mongoose');

const User = mongoose.model('User', {
	username: {
		type: String,
		required: true
	},
	yandex_id: {
		type: Number,
		required: true
	},
	realName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	card_id: {
		type: Number,
		required: true
	},
	telegram_id: Number
});

module.exports = User;
