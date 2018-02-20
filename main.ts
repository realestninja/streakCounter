import * as TelegramBot from 'node-telegram-bot-api';
import * as process from 'process';
import * as jsonfile from 'jsonfile';
import * as dateTime from 'node-datetime';

import { token, storageFolder } from './settings';

const fs = require('fs');
const bot = new TelegramBot(token, { polling: true });

console.log('bot running - pid: ' +  process.pid);

bot.on('message', json => {
  if (json.text) {
		const chatID = json.chat.id;
		const message = json.text;

		// reset or start counter on request
		handleRequest(chatID, message);
  }
});

const handleRequest = (chatID, message) => {
	const storageLocation = getStorageLocation(chatID);

	createFileIfNecessary(storageLocation);

	updateDate(storageLocation);
};

const updateDate = storageLocation => {
	const currentTime = getTimeStampInSeconds();

	const userData = readFromFile(storageLocation);
	const userDataWithNewDate = setDate(userData, currentTime);
	writeToFile(storageLocation, userDataWithNewDate);
};

const setDate = ( userData, currentTime ) => ({
	...userData,
	startDate: currentTime
});

const createFileIfNecessary = storageLocation => !checkIfStorageExists(storageLocation) && 
	createEmptyStorage(storageLocation);

const createEmptyStorage = storageLocation => 
	writeToFile(storageLocation, createStructure());

const createStructure = () => 
	({ startDate: -1 });

const getStorageLocation = chatID => 
	storageFolder + "/" + chatID + '.json';

const getTimeStampInSeconds = () =>
 parseInt(((+new Date()) / 1000).toFixed(0));

const checkIfStorageExists = storageLocation => 
	fs.existsSync(storageLocation);

const writeToFile = (storageLocation, data) => 
	jsonfile.writeFileSync(storageLocation, data);

const readFromFile = storageLocation =>
	jsonfile.readFileSync(storageLocation);

