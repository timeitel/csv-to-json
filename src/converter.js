import { mostCommonWords } from './util.js';
import pkg from 'csvtojson';
const { csv } = pkg;

async function convertToJSON(csvFilePath) {
  let jsonQuestion = '';
  const questions = await csv().fromFile(csvFilePath);
  const file = csvFilePath.split('/').pop();
  const fileName = file.substring(0, file.indexOf('.'));
  const labels = mostCommonWords(questions);

  // parse and reformat to be bulk imported into Elasticsearch
  for (const q of questions) {
    if (!q.QUESTION.length > 0) {
      break;
    }

    jsonQuestion += '{ "index": {} }\n';
    jsonQuestion += `{ "QUESTION": "${q.QUESTION}", "CORRECT": "1", "ANSWER_1": "${q.ANSWER}", "ANSWER_2": "${q.WRONG_1}", "ANSWER_3": "${q.WRONG_2}", "ANSWER_4": "${q.WRONG_3}", "CATEGORY": "${fileName}", "LABELS": "${labels}" }\n`;
  }
  console.log('Finished formatting to Elasticsearch json');

  return jsonQuestion;
}

export { convertToJSON };
