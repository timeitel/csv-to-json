const fs = require('fs');
const csvFilePath = './data.csv';
const csv = require('csvtojson');
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const jsonFile = JSON.stringify(jsonObj);

    fs.writeFile('data.json', jsonFile, (err) => {
      if (err) {
        throw err;
      }
      console.log('JSON data exported.');
    });
  });
