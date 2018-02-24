import * as jsonfile from 'jsonfile';

export const writeToFile = (storageLocation, data) => 
	jsonfile.writeFileSync(storageLocation, data);

