const fs = require('fs');
const csvFilePath = './import-data.csv';
const csv = require('csvtojson');
const outputFile = 'formatted-data.json';

createFile();
convertToJSON();

async function convertToJSON() {
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
  console.log('Finished formatting to Elasticsearch json import');
}

function createFile() {
  // create or overwrite
  fs.writeFileSync(outputFile, '', function (err) {
    if (err) throw err;
  });
}
