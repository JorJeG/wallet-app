const mongoose = require('mongoose');

const User = mongoose.model('User', {
/*	card_id: {
		type: [Number],
	},*/
	username: String,
	yandex_id: Number,
	realName: String,
	email: String,
	telegram_id: Number,
	avatar_id: String,
	phoneNumbers: [{
		type: String
	}],
	mailing: Boolean,
	date: {
		type: Date, default: Date.now()
	}
});

module.exports = User;
