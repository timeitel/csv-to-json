import * as fs from 'fs';

function createFile() {
  // create or overwrite
  fs.writeFileSync('./assets/formatted-questions.json', '', function (err) {
    if (err) throw err;
  });
}

export { createFile };
