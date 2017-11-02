'use strict';

const commission = 3;

module.exports = async (ctx) => {
	const cardId = ctx.params.id;

	const operation = ctx.request.body;
	const {sum, phoneNumber, mail, mailing} = operation;

	ctx.cardsModel.withdraw(cardId, parseInt(sum, 10) + commission);

	const transaction = await ctx.transactionsModel.create({
		cardId,
		type: 'withdrawCard',
		data: {phoneNumber},
		time: new Date().toISOString(),
		sum
	}, {mail, mailing});

	ctx.status = 200;
	ctx.body = transaction;
};
