const TelegramBot = require('node-telegram-bot-api');
const UsersModel = require('./../source/models/users');
const CardsModel = require('./../source/models/cards');
const TransactionsModel = require('./../source/models/transactions');
const axios = require('axios');
const CardInfo = require('card-info');

const usersModel = new UsersModel();
const cardsModel = new CardsModel();
const transactionsModel = new TransactionsModel();

const token = '454454123:AAHhzXuJat3R-Vh5BrVAlZPANvdNXoij0oM';

const Bot = new TelegramBot(token, {polling: true});

const axiosInstance = axios.create({baseURL: 'http://localhost:3001'});

let operator;
let options = {};
let phoneNumber;
let sum;

function showCards(userId, userCardsId, allCards) {
	let message = '';
	let count = 1;
	allCards.forEach((card) => {
		if (userCardsId.includes(card.id)) {
			const cardinfo = new CardInfo(card.cardNumber);
			message += `${count}  ${card.cardNumber} (${cardinfo.bankName})\n`;
			options[String(count)] = [card.cardNumber, cardinfo.bankName];
			count += 1;
		}
	});

	Bot.sendMessage(userId, `Ваши карты:\n${message}`);
}

Bot.onText(/^\/balance/, async (msg, match) => {
	const userId = msg.chat.id;
	const user = await usersModel.getBy({telegram_id: userId});
	const userCardsId = user.card_id;

	const allCards = await cardsModel.getAll();
	showCards(userId, userCardsId, allCards);

	operator = 'balance';
});

Bot.onText(/^\/cardToMobile (.+)/, async (msg, match) => {
	sum = match[1];
	const userId = msg.chat.id;
	const user = await usersModel.getBy({telegram_id: userId});
	const userCardsId = user.card_id;
	phoneNumber = user.phoneNumber;

	const allCards = await cardsModel.getAll();
	showCards(userId, userCardsId, allCards);

	operator = 'cardToMobile';

});

Bot.on('message', async (msg) => {
	const userId = msg.chat.id;
	if (operator === 'balance') {
		if (options[msg.text]) {
			const card = await cardsModel.getBy({cardNumber: options[msg.text][0]});
			Bot.sendMessage(userId, `Запрос баланса карты ${card.cardNumber} (${options[msg.text][1]})
			${String(card.balance)} руб`);
		}
	}
	else if (operator === 'cardToMobile') {
		if (options[msg.text]) {
			const card = await cardsModel.getBy({cardNumber: options[msg.text][0]});
			await axiosInstance.post(`/cards/${card.id}/pay`, {phoneNumber, sum, mail: '', mailing: ''});
		}
	}
});

module.exports = Bot;
