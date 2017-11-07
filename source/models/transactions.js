'use strict';

const ApplicationError = require('libs/application-error');

const DbModel = require('./common/dbModel');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const template = require('./mail.js');
const config = require('config');

class Transactions extends DbModel {
	constructor() {
		super('transaction');
	}

	/**
	 * Добавляет новую транзакцию
	 *
	 * @param {Object} transaction описание транзакции
	 * @returns {Promise.<Object>}
	 */
	async create(transaction, user) {
		const newTransaction = Object.assign({}, transaction, {
			id: await this._generateId()
		});
		// if (user.mailing) {
		// 	const transport = nodemailer.createTransport(smtpTransport({
		// 		service: 'Mail.ru',
		// 		auth: {
		// 			user: config.get('mailing.mail'),
		// 			pass: config.get('mailing.pass')
		// 		}
		// 	}));
		// 	const render = template(transaction);
		// 	transport.sendMail({
		// 		from: config.get('mailing.from'),
		// 		to: user.mail,
		// 		subject: 'Вы воспользовались услугой',
		// 		forceEmbeddedImages: true,
		// 		html: render,
		// 	}, (err) => {
		// 		if (err) return err.message;
		// 	});
		// }
		await this._insert(newTransaction);
		return newTransaction;
	}

	/**
	 * Получает транзакции по идентификатору карты
	 * @param {Number} cardId Идентификатор карты
	 * @return {Promise.<Object[]>}
	 */
	async getByCard(cardId) {
		const item = await this.getBy({cardId});
		return item;
	}

	/**
	 * Удаление транзакции
	 */
	static async remove() {
		throw new ApplicationError('Transaction can\'t be removed', 400);
	}
}

module.exports = Transactions;
