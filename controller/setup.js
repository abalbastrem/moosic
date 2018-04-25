const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');

// var TAGS = [];

// lineReader.eachLine(path.join(__dirname, '/globals/TAGS_TEST'), function(line, last) {
//   console.log(line);
//   TAGS.push(line);
//   if (last) {
//     console.log("TAGS: " + TAGS);
//     exports.TAGS = TAGS;
//   }
// });

// lineReader.open(path.join(__dirname, '/globals/TAGS_TEST'), function(reader) {
//   if (reader.hasNextLine()) {
//     reader.nextLine(function(line) {
//       console.log(line);
//       if (line != "") {
//         TAGS += line;
//       }
//     });
//   } else {
//     console.log(TAGS);
//   }
// });

exports.GENRES = fs.readFileSync(path.join(__dirname, '/globals/GENRES')).toString().trim().split("\n");
exports.TAGS = fs.readFileSync(path.join(__dirname, '/globals/TAGS')).toString().trim().split("\n");
exports.KEY = fs.readFileSync(path.join(__dirname, '/globals/JAMENDO_KEY')).toString().trim();
exports.DBCONFIG = fs.readFileSync(path.join(__dirname, '/globals/DBCONFIG')).toString().trim();
