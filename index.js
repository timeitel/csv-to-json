import { convertToJSON } from './converter.js';
import { createFile } from './util.js';

createFile();
convertToJSON('./import-data.csv');
