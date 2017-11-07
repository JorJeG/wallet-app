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

const errorController = require('./controllers/error');

const ApplicationError = require('libs/application-error');
const CardsModel = require('source/models/cards');
const TransactionsModel = require('source/models/transactions');
const UserModel = require('source/models/users');

const getTransactionsController = require('./controllers/transactions/get-transactions');

const mongoose = require('mongoose');

mongoose.connect(config.get('db.url'), {useMongoClient: true});
mongoose.Promise = global.Promise;

const app = new Koa();

const passport = require('koa-passport');
const session = require('koa-session');
const YandexStrategy = require('passport-yandex').Strategy;

// AUTH
app.keys = ['secret'];
app.use(session({}, app));
app.proxy = true;

app.use(passport.initialize());
app.use(passport.session());

const {
	YANDEX_CLIENT_ID,
	YANDEX_CLIENT_SECRET,
	YANDEX_CALLBACK_URL
} = config.get('oauth');

passport.use(new YandexStrategy(
	{
		clientID: YANDEX_CLIENT_ID,
		clientSecret: YANDEX_CLIENT_SECRET,
		callbackURL: YANDEX_CALLBACK_URL,
	},
	((accessToken, refreshToken, profile, done) => {
		// assign kept in memory user to profile, returned from oauth
		// for a real app, user must be put in the database
		// e.g. User.createOrUpdate(profile)
		done(null, profile);
	})
));

passport.serializeUser((user, done) => {
	// for a real app, an ID should be serialzed
	done(null, JSON.stringify(user));
});

passport.deserializeUser((data, done) => {
	// for a real app, a user must be found in a database
	// e.g. User.find(data)
	try {
		done(null, JSON.parse(data));
	} catch (err) {
		done(err);
	}
});

router.get(
	'/auth/yandex',
	passport.authenticate('yandex')
);

router.get(
	'/auth/yandex/callback',
	passport.authenticate('yandex'),
	(ctx) => {
		// Successful authentication, redirect home.
		ctx.redirect('/');
		ctx.status = 301;
	}
);


function getView(viewId) {
	const viewPath = path.resolve(__dirname, 'views', `${viewId}.server.js`);
	delete require.cache[require.resolve(viewPath)];
	return require(viewPath);
}

async function getData(ctx) {
	let loggedIn = null;
	const user = ctx.state.user;
	let cards = await ctx.cardsModel.getAll();
	let transactions = await ctx.transactionsModel.getAll({time: -1});
	let savedUser = null;

	// user from memory
	if (user) {
		loggedIn = {
			login: user.username,
			name: `${user.name.givenName} ${user.name.familyName}`,
			mail: user.emails[0],
			avatar_url: `https://avatars.yandex.net/get-yapic/${user._json.default_avatar_id}/islands-200`,
		};
		savedUser = await ctx.userModel.getBy({login: loggedIn.login});
		if (!savedUser) {
			savedUser = await ctx.userModel.create(loggedIn);
		}
		cards = await ctx.cardsModel.getAllWhere(savedUser._id);
		transactions = await ctx.transactionsModel.getAllWhere(savedUser._id, {time: -1});
	}


	return {
		user: loggedIn,
		cards,
		transactions,
		savedUser
	};
}

router.get('/logout', (ctx) => {
	ctx.logout();
	ctx.status = 200;
});

// Сохраним параметр id в ctx.params.id
router.param('id', (id, ctx, next) => next());
router.param('user', (id, ctx, next) => next());

router.get('/', async (ctx) => {
	const data = await getData(ctx);
	const indexView = getView('index');
	const indexViewHtml = renderToStaticMarkup(indexView(data));

	ctx.body = indexViewHtml;
});

const registeredOnly = async (ctx, controllerAction) => {
	if (ctx.isAuthenticated()) {
		return controllerAction(ctx);
	}
	ctx.status = 403;
	ctx.body = 403;
};

router.get('/cards/:user', (ctx) => registeredOnly(ctx, getCardsController));

router.post('/cards/', (ctx) => registeredOnly(ctx, createCardController));
router.delete('/cards/:id', (ctx) => registeredOnly(ctx, deleteCardController));

router.get('/cards/:id/transactions/', (ctx) => registeredOnly(ctx, getTransactionController));
router.post('/cards/:id/transactions/', (ctx) => registeredOnly(ctx, createTransactionsController));

router.post('/cards/:id/transfer', (ctx) => registeredOnly(ctx, cardToCard));
router.post('/cards/:id/pay', (ctx) => registeredOnly(ctx, cardToMobile));
router.post('/cards/:id/fill', (ctx) => registeredOnly(ctx, mobileToCard));

router.get('/transactions/', (ctx) => registeredOnly(ctx, getTransactionsController));

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
	ctx.userModel = new UserModel();
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
