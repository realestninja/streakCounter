import { readFromFile } from '../helper/filesystem/readFromFile';
import { getTimeStampInSeconds } 
	from '../helper/timeCalculation/getTimeStampInSeconds';
import { getTimeDifferenceInDays } 
	from '../helper/timeCalculation/getTimeDifferenceInDays';

export const getStreak = storageLocation => {
	const userData = readFromFile(storageLocation);
	const startTime = userData.startDate;
	const currentTime = getTimeStampInSeconds();

	const streak = getTimeDifferenceInDays(startTime, currentTime);
	return streak;
}

