const DbModel = require('common/dbModel');


class Users extends DbModel {
	constructor() {
		super('user');
	}
}

module.exports = Users;
