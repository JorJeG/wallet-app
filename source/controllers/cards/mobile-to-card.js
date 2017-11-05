'use strict';

module.exports = async (ctx) => {
	const cardId = ctx.params.id;

	const operation = ctx.request.body;
	const {phoneNumber, sum, mail, mailing} = operation;

	ctx.cardsModel.refill(cardId, sum);

	const transaction = await ctx.transactionsModel.create({
		cardId,
		type: 'paymentMobile',
		data: {phoneNumber},
		time: new Date().toISOString(),
		sum
	}, {mail, mailing});

	const activeCard = await ctx.cardsModel.get(cardId);
	ctx.Bot.sendMessage(229713286, `[New transaction]: ${transaction.sum} руб INCOME
		to card: ${activeCard.cardNumber}\n
		type: ${transaction.type}
		from mobile: ${phoneNumber}
		date: ${transaction.time.split('T')[0]}
		time: ${transaction.time.split('T')[1].split('.')[0]}`);
	ctx.status = 200;
	ctx.body = transaction;
};
