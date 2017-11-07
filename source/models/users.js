const DbModel = require('./common/dbModel');


class Users extends DbModel {
	constructor() {
		super('user');
	}

	async create(user) {
		await this._insert(user);
	}
}

module.exports = Users;
