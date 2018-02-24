import * as jsonfile from 'jsonfile';
const fs = require('fs');

export const writeToFile = (storageLocation, data) => 
	jsonfile.writeFileSync(storageLocation, data);

export const readFromFile = storageLocation =>
	jsonfile.readFileSync(storageLocation);

export const checkIfStorageExists = storageLocation => 
	fs.existsSync(storageLocation);

