import pkg from 'csvtojson';
const { csv } = pkg;
import * as fs from 'fs';
const outputFile = 'formatted-data.json';

async function convertToJSON(csvFilePath) {
  const questions = await csv().fromFile(csvFilePath);
  const writeStream = fs.createWriteStream(outputFile, {
    flags: 'a'
  });

  // parse and reformat to be bulk imported into Elasticsearch
  for (const q of questions) {
    if (!q.QUESTION.length > 0) {
      break;
    }

    writeStream.write('{ "index": {} }\n');
    writeStream.write(
      `{ "QUESTION": "${q.QUESTION}", "CORRECT": "1", "ANSWER_1": "${q.ANSWER}", "ANSWER_2": "${q.WRONG_1}", "ANSWER_3": "${q.WRONG_2}", "ANSWER_4": "${q.WRONG_3}", "CATEGORIES": "video games gaming call of duty" }\n`
    );
  }

  writeStream.write('\n');
  writeStream.end();
  console.log('Finished formatting to Elasticsearch json');
}

export { convertToJSON };
