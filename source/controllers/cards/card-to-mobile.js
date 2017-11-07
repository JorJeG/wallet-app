'use strict';

const commission = 3;

module.exports = async (ctx) => {
	const cardId = ctx.params.id;

	const operation = ctx.request.body;
	const {
		sum,
		phoneNumber,
		mail,
		mailing,
		_id
	} = operation;

	ctx.cardsModel.withdraw(cardId, parseInt(sum, 10) + commission);

	const transaction = await ctx.transactionsModel.create({
		cardId,
		type: 'paymentMobile',
		data: {phoneNumber},
		time: new Date().toISOString(),
		sum,
		owner: _id
	}, {mail, mailing});

	const activeCard = await ctx.cardsModel.get(cardId);
	ctx.Bot.sendMessage(229713286, `[New transaction]: ${transaction.sum} руб WITHDRAWN
		from card: ${activeCard.cardNumber}\n
		type: ${transaction.type}
		to mobile: ${phoneNumber}
		date: ${transaction.time.split('T')[0]}
		time: ${transaction.time.split('T')[1].split('.')[0]}`);
	ctx.status = 200;
	ctx.body = transaction;
};
