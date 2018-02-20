import * as TelegramBot from 'node-telegram-bot-api';
import * as process from 'process';

import { token } from './settings';

const bot = new TelegramBot(token, { polling: true });

console.log('bot running - pid: ' +  process.pid);

bot.on('message', json => {
  if (json.hasOwnProperty('text')) {
    const chatID = json.chat.id;
    const message = json.text;

		console.log(json);
  }
});
