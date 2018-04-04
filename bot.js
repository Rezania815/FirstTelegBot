'use strict';

const
config = require('./config'),
TelegramBot = require('telegram-bot-api.js').default,
bot = new TelegramBot(config.token, config.botOption)
;

module.exports = bot;