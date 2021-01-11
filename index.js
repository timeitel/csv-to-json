import { convertToJSON } from './src/converter.js';
import { createFile } from './src/util.js';

createFile();
convertToJSON('./import-data.csv');
