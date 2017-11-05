const mongoose = require('mongoose');

const User = mongoose.model('User', {
	username: String,
	yandex_id: Number,
	realName: String,
	email: String,
	token: String
});

module.exports = User;
