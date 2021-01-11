const fs = require('fs');
const csvFilePath = './gaming-data.csv';
const csv = require('csvtojson');

convertToJSON();

async function convertToJSON() {
  const jsonArray = await csv().fromFile(csvFilePath);

  // parse and reformat
  jsonFormatted = jsonArray.map((obj) => {
    return {
      QUESTION: obj.QUESTION,
      CORRECT: '1',
      ANSWER_1: obj.ANSWER,
      ANSWER_2: obj.WRONG_1,
      ANSWER_3: obj.WRONG_2,
      ANSWER_4: obj.WRONG_3,
      CATEGORIES: 'video games gaming call of duty'
    };
  });

  fs.writeFile('gaming-data.json', JSON.stringify(jsonFormatted), (err) => {
    if (err) {
      throw err;
    }
    console.log('JSON data exported.');
  });
}
