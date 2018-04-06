import { createStructure } from './createStructure';
import { getStreak } from './getStreak';
import { getStorageLocation } from '../helper/filesystem/getStorageLocation';
import { createFileIfNecessary } from '../helper/filesystem/createFileIfNecessary';
import { updateDate } from '../helper/timeCalculation/updateDate';

export const handleRequest = (bot, chatID, message, storageFolder) => {
	const storageLocation = getStorageLocation(chatID, storageFolder);

	const messageArguments = message.split(/[ ,]+/);
	const request = messageArguments[0];
	let reply = '';
	
	switch(request) {
		case '/reset':
		case '/start': 
			createFileIfNecessary(storageLocation, createStructure() );

			if (messageArguments.length > 1) {
				const additionalParam = messageArguments[1];
				// validieren
				updateDate(storageLocation, additionalParam);
			} else {
				updateDate(storageLocation);
			}

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

