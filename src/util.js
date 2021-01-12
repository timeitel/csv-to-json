import { mostCommonWordsCount } from 'truly-unique';
import { convertToJSON } from './converter.js';

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

async function convertAndPost() {
  const questions = await convertToJSON('./assets/import-data.csv');

  try {
    const res = await axios.post(
      'http://localhost:9200/questions/_bulk?pretty',
      questions,
      {
        headers: {
          'Content-Type': 'application/x-ndjson'
        }
      }
    );

    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

export { mostCommonWords, convertAndPost };
