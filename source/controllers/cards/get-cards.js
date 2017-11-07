'use strict';

module.exports = async (ctx) => {
	const userId = ctx.params.user;
	ctx.body = await ctx.cardsModel.getAllWhere(userId);
};
