const fs = require('fs');

const inputFile = process.argv[2];
if (!inputFile) {
  throw Error('No input file received!');
}

const inputData = JSON.parse(fs.readFileSync(inputFile));

module.exports = inputData;
