const mongoose = require('mongoose');

const User = mongoose.model('User', {
	username: String,
	yandex_id: Number,
	realName: String,
	email: String,
	token: String,
	phoneNumber: String,
	card: Number,
	telegram_id: Number
});

module.exports = User;
