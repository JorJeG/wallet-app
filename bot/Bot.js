const TelegramBot = require('node-telegram-bot-api');
const UsersModel = require('./../source/models/users');
const CardsModel = require('./../source/models/cards');
const TransactionsModel = require('./../source/models/transactions');
const axios = require('axios');
const CardInfo = require('card-info');

const usersModel = new UsersModel();
const cardsModel = new CardsModel();

const token = '454454123:AAHhzXuJat3R-Vh5BrVAlZPANvdNXoij0oM';

const Bot = new TelegramBot(token, {polling: true});

const axiosInstance = axios.create({baseURL: 'http://localhost:3001'});


let chats = [];

function showCards(userId, userCardsId, allCards, mess) {
	let message = '';
	let count = 1;
	allCards.forEach((card) => {
		if (userCardsId.includes(card.id)) {
			const cardinfo = new CardInfo(card.cardNumber);
			message += `${count}  ${card.cardNumber} (${cardinfo.bankName})\n`;

			if (!chats[userId].options) {
				chats[userId].options = {};
			}
			chats[userId].options[String(count)] = [card.cardNumber, cardinfo.bankName];
			count += 1;
		}
	});

	chats[userId].lastMsg = `${mess}\n${message}`;
	Bot.sendMessage(userId, chats[userId].lastMsg);
}

Bot.onText(/^\/balance/, async (msg, match) => {
	const userId = msg.chat.id;
	if (!chats[userId]) {
		chats[userId] = {};
	}
	const user = await usersModel.getBy({telegram_id: userId});
	if (user) {
		const userCardsId = user.card_id;

		const allCards = await cardsModel.getAll();
		showCards(userId, userCardsId, allCards, 'Выберите карту:');

		chats[userId].operator = 'balance';
	}
	else {
		Bot.sendMessage(userId, 'Ваш Telegram аккаунт не привязан ни к одному из пользователей в приложении');
	}
});

Bot.onText(/^\/cardToMobile (.+)/, async (msg, match) => {
	const userId = msg.chat.id;
	if (!chats[userId]) {
		chats[userId] = {};
	}
	const user = await usersModel.getBy({telegram_id: userId});
	if (user) {
		const userCardsId = user.card_id;
		chats[userId].sum = match[1];
		chats[userId].phoneNumber = user.phoneNumber;

		const allCards = await cardsModel.getAll();
		showCards(userId, userCardsId, allCards, 'Выберите карту, с которой произвести перевод на мобильный телефон:');

		chats[userId].operator = 'cardToMobile';
	}
	else {
		Bot.sendMessage(userId, 'Ваш Telegram аккаунт не привязан ни к одному из пользователей в приложении');
	}
});

Bot.onText(/^\/cardToCard (.+)/, async (msg, match) => {
	const userId = msg.chat.id;
	if (!chats[userId]) {
		chats[userId] = {};
	}
	const user = await usersModel.getBy({telegram_id: userId});
	if (user) {
		const userCardsId = user.card_id;
		chats[userId].sum = match[1];

		const allCards = await cardsModel.getAll();
		showCards(userId, userCardsId, allCards, 'Выберите карту, с которой произвести перевод и карту,' +
			' на которую произвести перевод через пробел (Например, "1 2"):');

		chats[userId].operator = 'cardToCard';
	}
	else {
		Bot.sendMessage(userId, 'Ваш Telegram аккаунт не привязан ни к одному из пользователей в приложении');
	}
});

Bot.onText(/^\/mobileToCard (.+)/, async (msg, match) => {
	const userId = msg.chat.id;
	if (!chats[userId]) {
		chats[userId] = {};
	}
	const user = await usersModel.getBy({telegram_id: userId});
	if (user) {
		const userCardsId = user.card_id;
		chats[userId].sum = match[1];
		chats[userId].phoneNumber = user.phoneNumber;

		const allCards = await cardsModel.getAll();
		showCards(userId, userCardsId, allCards, 'Выберите карту, на которую произвести перевод:');

		chats[userId].operator = 'mobileToCard';
	}
	else {
		Bot.sendMessage(userId, 'Ваш Telegram аккаунт не привязан ни к одному из пользователей в приложении');
	}
});

Bot.onText(/^\/help/, (msg) => {
	const userId = msg.chat.id;
	Bot.sendMessage(
		userId,
		`Данный бот понимает команды:
		/balance - узнать баланс карты;
		/cardToMobile @сумма - положить деньги на ваш телефон с одной из ваших карт;
		/cardToCard @сумма - перевести деньги с одной из ваших карт на другую вашу карту;
		/mobileToCard @сумма - перевести деньги на одну из ваших карт с вашего телефона`
	);
});

Bot.on('message', async (msg) => {
	const userId = msg.chat.id;
	if (chats[userId]) {
		if (chats[userId].operator === 'balance') {
			if (chats[userId].options[msg.text]) {
				const card = await cardsModel.getBy({cardNumber: chats[userId].options[msg.text][0]});
				Bot.sendMessage(userId, `Запрос баланса карты ${card.cardNumber} (${chats[userId].options[msg.text][1]})
					${String(card.balance)} руб`);
				chats[userId].operator = '';
			}
			else {
				Bot.sendMessage(userId, chats[userId].lastMsg);
			}
		}
		else if (chats[userId].operator === 'cardToMobile') {
			if (chats[userId].options[msg.text]) {
				const card = await cardsModel.getBy({cardNumber: chats[userId].options[msg.text][0]});
				await axiosInstance.post(`/cards/${card.id}/pay`, {phoneNumber: chats[userId].phoneNumber, sum: chats[userId].sum, mail: '', mailing: ''});
				chats[userId].operator = '';
			}
			else {
				Bot.sendMessage(userId, chats[userId].lastMsg);
			}
		}
		else if (chats[userId].operator === 'cardToCard') {
			const firstCard = msg.text.split(' ')[0];
			const secondCard = msg.text.split(' ')[1];

			if (chats[userId].options[secondCard] && chats[userId].options[firstCard]) {
				const card = await cardsModel.getBy({cardNumber: chats[userId].options[firstCard][0]});
				const selectedCard = await cardsModel.getBy({cardNumber: chats[userId].options[secondCard][0]});

				await axiosInstance.post(
					`/cards/${card.id}/transfer`,
					{
						target: selectedCard.id, sum: chats[userId].sum, mail: '', mailing: ''
					}
				);
				chats[userId].operator = '';
			}
			else {
				Bot.sendMessage(userId, chats[userId].lastMsg);
			}
		}
		else if (chats[userId].operator === 'mobileToCard') {
			if (chats[userId].options[msg.text]) {
				const card = await cardsModel.getBy({cardNumber: chats[userId].options[msg.text][0]});
				await axiosInstance.post(`/cards/${card.id}/fill`, {phoneNumber: chats[userId].phoneNumber, sum: chats[userId].sum, mail: '', mailing: ''});
				chats[userId].operator = '';
			}
			else {
				Bot.sendMessage(userId, chats[userId].lastMsg);
			}
		}
	}
});

module.exports = Bot;
