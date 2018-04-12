/// SERVER CONFIG ///
var express = require('express');
var app = express();
var server = require('http').createServer(app);
// var bcrypt = require('bcrypt');
var logger = require('./log');
logger.info('log to file');
server.listen(8888);

console.log("::::: SERVER ONLINE :::::")

var dbip = '192.168.1.18';
var dbname = 'moosic';
var dbclient = 'postgresql';
var dbport = '5432'; // postgresql port
var url = dbclient + '://' + dbip + ':' + dbport + '/' + dbname;

/// LOG ///
var n = 0;
var logger = function(request, response, next) {
  console.log("REQ " + ++n + "\t" + new Date().toISOString());
  next();
};
app.use(logger);

function log(request, response) {
  console.log("PATH:\t" + request.route.path);
  console.log("URL:\t" + request.originalUrl);
  console.log("IP:\t" + request.ip);
  console.log("");
}

/// MODEL ///
// var tracks = require('tracksmodel');

/// HANDLERS ///
app.get('/', function(request, response) {
  // log(request, response);
  response.write('hello world');
  response.end();
});
