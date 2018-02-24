import { writeToFile } from './writeToFile';

export const createEmptyStorage = ( storageLocation, emptyStructure ) => 
	writeToFile(storageLocation, emptyStructure);

