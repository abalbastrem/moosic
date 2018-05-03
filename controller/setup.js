const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');

exports.GENRES = fs.readFileSync(path.join(__dirname, '/globals/GENRES')).toString().trim().split("\n");
exports.TAGS = fs.readFileSync(path.join(__dirname, '/globals/TAGS')).toString().trim().split("\n");
exports.KEY = fs.readFileSync(path.join(__dirname, '/globals/JAMENDO_KEY')).toString().trim();
exports.DBCONFIG = fs.readFileSync(path.join(__dirname, '/globals/DBCONFIG')).toString().trim();
