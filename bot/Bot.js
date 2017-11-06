const TelegramBot = require('node-telegram-bot-api');
const UsersModel = require('./../source/models/users');
const CardsModel = require('./../source/models/cards');

const usersModel = new UsersModel();
const cardsModel = new CardsModel();

const token = '454454123:AAHhzXuJat3R-Vh5BrVAlZPANvdNXoij0oM';

const Bot = new TelegramBot(token, {polling: true});

let operator;
let options = {};

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

Bot.on('message', async (msg) => {
	const userId = msg.chat.id;
	if (operator === 'balance') {
		if (options[msg.text]) {
			const card = await cardsModel.getBy({cardNumber: options[msg.text]});
			Bot.sendMessage(userId, `${String(card.balance)} руб`);
		}
	}
});

module.exports = Bot;
