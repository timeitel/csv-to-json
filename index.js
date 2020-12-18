const fs = require('fs');
const csvFilePath = './data.csv';
const csv = require('csvtojson');

convertToJSON();

async function convertToJSON() {
  const jsonArray = await csv().fromFile(csvFilePath);

  // parse and reformat
  //   jsonFormatted = Object.entries(jsonArray).map(([k, v]) => {
  //     return {};
  //   });

  fs.writeFile('data.json', JSON.stringify(jsonArray), (err) => {
    if (err) {
      throw err;
    }
    console.log('JSON data exported.');
  });
}
