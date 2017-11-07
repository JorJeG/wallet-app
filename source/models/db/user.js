const mongoose = require('mongoose');

const User = mongoose.model('User', {
	login: String,
	yandex_id: String,
	name: String,
	mail: mongoose.Schema.Types.Mixed,
	telegramID: Number,
	avatar_url: String,
	phoneNumbers: [{
		type: String
	}],
	mailing: Boolean,
	date: {
		type: Date, default: Date.now()
	}
});

module.exports = User;
