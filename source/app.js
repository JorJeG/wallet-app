'use strict';

const Koa = require('koa');
const path = require('path');
const config = require('config');
const serve = require('koa-static');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')();

const logger = require('libs/logger')('app');

const {renderToStaticMarkup} = require('react-dom/server');

const getCardsController = require('./controllers/cards/get-cards');
const createCardController = require('./controllers/cards/create');
const deleteCardController = require('./controllers/cards/delete');
const getTransactionController = require('./controllers/transactions/get');
const createTransactionsController = require('./controllers/transactions/create');
const cardToCard = require('./controllers/cards/card-to-card');
const cardToMobile = require('./controllers/cards/card-to-mobile');
const mobileToCard = require('./controllers/cards/mobile-to-card');

const Bot = require('bot/Bot');

const errorController = require('./controllers/error');

const ApplicationError = require('libs/application-error');
const CardsModel = require('source/models/cards');
const TransactionsModel = require('source/models/transactions');
const UsersModel = require('source/models/users');

const getTransactionsController = require('./controllers/transactions/get-transactions');

const mongoose = require('mongoose');

mongoose.connect(config.get('db.url'), {useMongoClient: true});
mongoose.Promise = global.Promise;


const app = new Koa();

function getView(viewId) {
	const viewPath = path.resolve(__dirname, 'views', `${viewId}.server.js`);
	delete require.cache[require.resolve(viewPath)];
	return require(viewPath);
}

async function getData(ctx) {
	const user = {
		login: 'samuel_johnson',
		name: 'Samuel Johnson',
		mail: 'georg_starkov@mail.ru',
		mailing: false
	};
	const cards = await ctx.cardsModel.getAll();
	const transactions = await ctx.transactionsModel.getAll({time: -1});

	return {
		user,
		cards,
		transactions
	};
}

// Сохраним параметр id в ctx.params.id
router.param('id', (id, ctx, next) => next());

router.get('/', async (ctx) => {
	const data = await getData(ctx);
	const indexView = getView('index');
	const indexViewHtml = renderToStaticMarkup(indexView(data));

	ctx.body = indexViewHtml;
});

router.get('/cards/', getCardsController);
router.post('/cards/', createCardController);
router.delete('/cards/:id', deleteCardController);

router.get('/cards/:id/transactions/', getTransactionController);
router.post('/cards/:id/transactions/', createTransactionsController);

router.post('/cards/:id/transfer', cardToCard);
router.post('/cards/:id/pay', cardToMobile);
router.post('/cards/:id/fill', mobileToCard);

router.get('/transactions/', getTransactionsController);

router.all('/error', errorController);

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error handler
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		logger.error('Error detected', err);
		ctx.status = err instanceof ApplicationError ? err.status : 500;
		ctx.body = `Error [${err.message}] :(`;
	}
});

// Создадим модель Cards и Transactions на уровне приложения и проинициализируем ее
app.use(async (ctx, next) => {
	ctx.cardsModel = new CardsModel();
	ctx.transactionsModel = new TransactionsModel();

	await next();
});

app.use(async (ctx, next) => {
	ctx.Bot = Bot;

	await next();
});


app.use(bodyParser);
app.use(router.routes());

if (config.get('server.serve_static_files')) {
	app.use(serve('./public'));
}

const LISTEN_PORT = config.get('server.port');

app.listen(LISTEN_PORT, () => {
	logger.info(`Application started on ${LISTEN_PORT}`);
});

module.exports = app;
