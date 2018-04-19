const fs = require('fs');
const path = require('path');

const GENRES = fs.readFileSync(path.join(__dirname, '/globals/GENRES')).toString();
exports.GENRES = GENRES.split("\n");
const TAGS = fs.readFileSync(path.join(__dirname, '/globals/TAGS_TEST')).toString();
exports.TAGS = TAGS.split("\n");
exports.KEY = fs.readFileSync(path.join(__dirname, '/globals/JAMENDO_KEY')).toString();
