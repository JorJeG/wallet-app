const TelegramBot = require('node-telegram-bot-api');
const UsersModel = require('./../source/models/users');
const CardsModel = require('./../source/models/cards');
const TransactionsModel = require('./../source/models/transactions');
const axios = require('axios');

const usersModel = new UsersModel();
const cardsModel = new CardsModel();
const transactionsModel = new TransactionsModel();

const token = '454454123:AAHhzXuJat3R-Vh5BrVAlZPANvdNXoij0oM';

const Bot = new TelegramBot(token, {polling: true});

let operator;
let options = {};
let phoneNumber;
let sum;

Bot.onText(/^\/balance/, async (msg, match) => {
	const userId = msg.chat.id;
	const user = await usersModel.getBy({telegram_id: userId});
	const userCardsId = user.card_id;

	const allCards = await cardsModel.getAll();

	let message = '';
	let count = 1;
	allCards.forEach((card) => {
		if (userCardsId.includes(card.id)) {
			message += `${count}  ${card.cardNumber}\n`;
			options[String(count)] = card.cardNumber;
			count += 1;
		}
	});

	Bot.sendMessage(userId, message);
	operator = 'balance';
});

Bot.onText(/^\/cardToMobile (.+)/, async (msg, match) => {
	sum = match[1];
	const userId = msg.chat.id;
	const user = await usersModel.getBy({telegram_id: userId});
	const userCardsId = user.card_id;
	phoneNumber = user.phoneNumber;

	const allCards = await cardsModel.getAll();

	let message = '';
	let count = 1;
	allCards.forEach((card) => {
		if (userCardsId.includes(card.id)) {
			message += `${count}  ${card.cardNumber}\n`;
			options[String(count)] = card.cardNumber;
			count += 1;
		}
	});

	Bot.sendMessage(userId, message);
	operator = 'cardToMobile';

});

Bot.on('message', async (msg) => {
	const userId = msg.chat.id;
	if (operator === 'balance') {
		if (options[msg.text]) {
			const card = await cardsModel.getBy({cardNumber: options[msg.text]});
			Bot.sendMessage(userId, `${String(card.balance)} руб`);
		}
	}
	else if (operator === 'cardToMobile') {
		if (options[msg.text]) {
			const card = await cardsModel.getBy({cardNumber: options[msg.text]});
			await transactionsModel.create({cardId: card.Id, type: 'paymentMobile', data: {phoneNumber}, time: new Date().toISOString(), sum}, {});
			Bot.sendMessage(userId, `${phoneNumber}   ${sum}`);
		}
	}
});

module.exports = Bot;
