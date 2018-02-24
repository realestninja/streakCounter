import * as TelegramBot from 'node-telegram-bot-api';
import * as process from 'process';
import * as dateTime from 'node-datetime';

import { handleRequest } from './src/functions/handleRequest';
import { token, storageFolder } from './settings';

const bot = new TelegramBot(token, { polling: true });

console.log('bot running - pid: ' +  process.pid);

bot.on('message', json => {
  if (json.text) {
		const chatID = json.chat.id;
		const message = json.text;

		// reset or start counter on request
		handleRequest(bot, chatID, message, storageFolder);
  }
});

