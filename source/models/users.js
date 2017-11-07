'use strict';

const ApplicationError = require('libs/application-error');

const DbModel = require('./common/dbModel');

class Users extends DbModel {
	constructor() {
		super('user');
	}
	/**
	 * Добавляет пользователя
	 *
	 * @param {Object} user описание пользователя
	 * @returns {Promise.<Object>}
	 */
	async create(user) {
		await this._insert(user);
	}
}

module.exports = Users;
