import { createEmptyStorage } from './createEmptyStorage';
import { checkIfStorageExists } from './checkIfStorageExists';

export const createFileIfNecessary = ( storageLocation, structure ) => !checkIfStorageExists(storageLocation) && 
	createEmptyStorage(storageLocation, structure);

