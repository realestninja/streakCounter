import * as jsonfile from 'jsonfile';

export const readFromFile = storageLocation =>
	jsonfile.readFileSync(storageLocation);

