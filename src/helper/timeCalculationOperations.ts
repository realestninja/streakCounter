import { 
	writeToFile,
	readFromFile
} from './filesystemOperations';

export const getTimeStampInSeconds = () =>
 parseInt(((+new Date()) / 1000).toFixed(0));

export const setDate = ( userData, currentTime ) => ({
	...userData,
	startDate: currentTime
});

export const updateDate = ( storageLocation, daysPast = 0 ) => {
	const currentTime = getTimeStampInSeconds();
	const userData = readFromFile(storageLocation);
	const userDataWithNewDate = setDate(userData, currentTime);
	writeToFile(storageLocation, userDataWithNewDate);
};

