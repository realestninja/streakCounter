import * as TelegramBot from 'node-telegram-bot-api';
import * as process from 'process';
import * as dateTime from 'node-datetime';

import { 
	writeToFile, 
	readFromFile,
	checkIfStorageExists
	} from './src/helper/filesystemOperations';

import { 
	getTimeStampInSeconds,
	setDate,
	updateDate
	} from './src/helper/timeCalculationOperations';

import { token, storageFolder } from './settings';

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

	const messageArguments = message.split(/[ ,]+/);
	const request = messageArguments[0];
	let reply = '';
	

	switch(request) {
		case '/reset':
		case '/start': 
			createFileIfNecessary(storageLocation);

			if (messageArguments.length > 1) {
				const additionalParam = messageArguments[1];
				// validieren
				updateDate(storageLocation, additionalParam);
			} else {
				updateDate(storageLocation);
			}

			//console.log('counter for ' + chatID + ' has been updated');
			reply = "Your Counter has been set to 0 days";
			bot.sendMessage(chatID, reply);
			break;

		case '/streak':
			const streak = getStreak(storageLocation);
			reply = 'Your current streak in days: ' + streak;
			bot.sendMessage(chatID, reply);
			break;
		
		default:
			console.log('not a valid input');
	}
};

const getStreak = storageLocation => {
	const userData = readFromFile(storageLocation);
	const startTime = userData.startDate;
	const currentTime = getTimeStampInSeconds();

	const streak = getTimeDifferenceInDays(startTime, currentTime);
	return streak;
}

const getTimeDifferenceInDays = (start, end) => {
	let difference = end - start;

	//from seconds to floored days
	difference = Math.floor(difference / 60 / 60 / 24);

	return difference;
}

const createFileIfNecessary = storageLocation => !checkIfStorageExists(storageLocation) && 
	createEmptyStorage(storageLocation);

const createEmptyStorage = storageLocation => 
	writeToFile(storageLocation, createStructure());

const createStructure = () => 
	({ startDate: -1 });

const getStorageLocation = chatID => 
	storageFolder + "/" + chatID + '.json';

