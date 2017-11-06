'use strict';


module.exports = async (ctx) => {
	const cardId = ctx.params.id;

	const operation = ctx.request.body;
	const {target, sum, mail, mailing} = operation;

	await ctx.cardsModel.withdraw(cardId, sum);
	await ctx.cardsModel.refill(target, sum);

	const sourceCard = await ctx.cardsModel.get(cardId);
	const targetCard = await ctx.cardsModel.get(target);

	const transaction = await ctx.transactionsModel.create({
		cardId: sourceCard.id,
		type: 'withdrawCard',
		data: {
			cardNumber: targetCard.cardNumber
		},
		time: new Date().toISOString(),
		sum
	}, {mail, mailing});

	const activeCard = await ctx.cardsModel.get(cardId);
	ctx.Bot.sendMessage(229713286, `[New transaction]: ${transaction.sum} руб WITHDRAWN
		from card: ${activeCard.cardNumber}\n
		type: ${transaction.type}
		to card: ${transaction.data.cardNumber}
		date: ${transaction.time.split('T')[0]}
		time: ${transaction.time.split('T')[1].split('.')[0]}`);
	ctx.status = 200;
	ctx.body = transaction;
};
