'use strict';

module.exports = async (ctx) => {
	const {_id} = ctx.state.user;
	ctx.body = await ctx.cardsModel.getAllWhere(_id);
};
