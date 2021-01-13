import { mostCommonWordsCount } from 'truly-unique';
import axios from 'axios';

function mostCommonWords(questionsArray) {
  let combinedString = '';

  questionsArray.forEach((questionObj) => {
    const values = Object.values(questionObj).map((q) => `${q} `);

    combinedString = combinedString.concat(...values);
  });

  const commonWords = mostCommonWordsCount(combinedString, { stopwords: true });
  const commonWordsFormatted = commonWords
    .slice(0, 10)
    .map((w) => w.key)
    .join(' ');

  return commonWordsFormatted;
}

async function postToElasticSearch(docs) {
  try {
    const res = await axios.post(
      'http://localhost:9200/questions/_bulk?pretty',
      docs,
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

export { mostCommonWords, postToElasticSearch };
