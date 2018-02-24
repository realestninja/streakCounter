import { writeToFile } from '../filesystem/writeToFile';
import { readFromFile } from '../filesystem/readFromFile';
import { getTimeStampInSeconds } from './getTimeStampInSeconds';
import { setDate } from './setDate';

export const updateDate = ( storageLocation, daysPast = 0 ) => {
	const currentTime = getTimeStampInSeconds();
	const userData = readFromFile(storageLocation);
	const userDataWithNewDate = setDate(userData, currentTime);
	writeToFile(storageLocation, userDataWithNewDate);
};

