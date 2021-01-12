import { mostCommonWordsCount } from 'truly-unique';
import * as fs from 'fs';

function createFile() {
  // create or overwrite
  fs.writeFileSync('./assets/formatted-questions.json', '', function (err) {
    if (err) throw err;
  });
}

function mostCommonWords(questionsArray) {
  let combinedString = '';

  questionsArray.forEach((questionObj) => {
    const values = Object.values(questionObj).map((q) => `${q} `);

    combinedString = combinedString.concat(...values);
  });

  const commonWords = mostCommonWordsCount(combinedString, { stopwords: true });
  const commonWordsFormatted = commonWords
    .slice(0, 20)
    .map((w) => w.key)
    .join(' ');

  return commonWordsFormatted;
}

export { createFile, mostCommonWords };
