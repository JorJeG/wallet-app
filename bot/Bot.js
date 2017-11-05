const TelegramBot = require('node-telegram-bot-api');

const token = '454454123:AAHhzXuJat3R-Vh5BrVAlZPANvdNXoij0oM';

const Bot = new TelegramBot(token, {polling: true});




module.exports = Bot;
