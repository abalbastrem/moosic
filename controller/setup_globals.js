// Sets the global variables
const fs = require('fs');
const path = require('path');

exports.GENRES = fs.readFileSync(path.join(__dirname, '/globals/GENRES')).toString().trim().split("\n");
exports.TAGS = fs.readFileSync(path.join(__dirname, '/globals/TAGS')).toString().trim().split("\n");
exports.KEY = fs.readFileSync(path.join(__dirname, '/../config/JAMENDO_KEY')).toString().trim();
exports.DBCONFIG = fs.readFileSync(path.join(__dirname, '/../config/DBCONFIG')).toString().trim();
