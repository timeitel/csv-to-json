import { postToElasticSearch } from './src/util.js';
import { convertToJSON } from './src/converter.js';
import fs from 'fs';

async function convertCsvToJsonAndPostToElastic(pathToCSV) {
  const questions = await convertToJSON(pathToCSV);
  postToElasticSearch(questions);

  console.log('Finished converting and posting to Elasticsearch');
}

function startFromDirectory(folder) {
  try {
    const csvFiles = fs.readdirSync(folder);

    csvFiles.forEach((file) => {
      convertCsvToJsonAndPostToElastic(`./assets/questions/${file}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startFromDirectory('./assets/questions');
