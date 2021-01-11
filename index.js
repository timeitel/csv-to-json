const fs = require('fs');
const csvFilePath = './import-data.csv';
const csv = require('csvtojson');
const outputFile = 'formatted-data.json';

convertToJSON();

async function convertToJSON() {
  fs.unlinkSync(outputFile);

  const writeStream = fs.createWriteStream(outputFile, {
    flags: 'a'
  });
  const questions = await csv().fromFile(csvFilePath);

  // parse and reformat to be bulk imported into Elasticsearch
  for (let q of questions) {
    writeStream.write('{ "index": {} }\n');
    writeStream.write(
      `{ "QUESTION": "${q.QUESTION}", "CORRECT": "1", "ANSWER_1": "${q.ANSWER}", "ANSWER_2": "${q.WRONG_1}", "ANSWER_3": "${q.WRONG_2}", "ANSWER_4": "${q.WRONG_3}", "CATEGORIES": "video games gaming call of duty" }\n`
    );

    // break;
  }

  writeStream.write('\n');
  writeStream.end();
  console.log('Finished formatting json');
}
