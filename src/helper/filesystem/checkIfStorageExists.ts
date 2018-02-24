const fs = require('fs');

export const checkIfStorageExists = storageLocation => 
	fs.existsSync(storageLocation);

