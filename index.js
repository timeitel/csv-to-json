import { convertToJSON } from './src/converter.js';
import { createFile } from './src/util.js';

createFile();
convertToJSON('./assets/import-data.csv');
