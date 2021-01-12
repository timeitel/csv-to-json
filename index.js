import { postToElasticSearch } from './src/util.js';
import { convertToJSON } from './src/converter.js';

convertAndPostToElasticSearch('./assets/import-data.csv');

async function convertAndPostToElasticSearch(pathToCSV) {
  const questions = await convertToJSON(pathToCSV);
  postToElasticSearch(questions);

  console.log('Finished converting and posting to Elasticsearch');
}
