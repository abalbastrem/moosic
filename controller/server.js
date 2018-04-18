/// SERVER CONFIG ///
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bcrypt = require('bcryptjs');
const requestify = require('requestify');
const SQLBuilder = require('json-sql-builder2');
// var logger = require('./log');
// logger.info('error log started');
const pg = require('pg');
const methods = require('./methods');
// const pgpromise = require('pg-promise');
server.listen(8888);
console.log("::::: SERVER ONLINE :::::");

/// HANDLERS ///
app.get('/', function(request, response) {
  log(request, response);
  // wrapper(request, response, this);
  response.write('hello world');
  response.end();
});

app.get('/test', function(request, response) {
  log(request, response);
  response.end();
});

app.get('/testdb', async function(request, response) {
  log(request, response);
  try {
    var ret = await methods.testdb();
    response.writeHead(200, {
      'Content-type': 'text/html'
    });
    response.write(ret);
    response.end();
  } catch (e) {
    response.writeHead(500);
    response.end();
    console.error("ERROR: " + e);
  }
});

app.get('/testdump', async function(request, response) {
  log(request, response);
  try {
    response.writeHead(200, {
      'Content-type': 'text/html'
    });
    var ret = await methods.testdump();
    console.log("::::: RESPONSE: " + ret);
    response.write("::::: " + ret);
    response.end();
  } catch (e) {
    response.writeHead(500);
    response.end();
    console.error("ERROR: " + e);
  }
});

// general use
app.post('/get', function(request, response) {
  log(request, response);
  get(args);
});

/// FROM JAMENDO ///
const JAMENDO_KEY = "e106f235";

/// MODEL ///
// var tracks = require('tracksmodel');

/// QUICK LOG ///
var n = 0;
// var logger = function(request, response, next) {
//   console.log("REQ " + ++n + "\t" + new Date().toISOString());
//   next();
// };
// app.use(logger);

function log(request, response) {
  console.log("::::: REQ " + ++n + "\t" + new Date().toISOString());
  console.log("::::: PATH:\t" + request.route.path);
  console.log("::::: URL:\t" + request.originalUrl);
  console.log("::::: IP:\t" + request.ip);
  console.log("");
};

function logwrapper(request, response, cb) {
  console.log("REQ " + ++n + "\t" + new Date().toISOString());
  console.log("PATH:\t" + request.route.path);
  console.log("URL:\t" + request.originalUrl);
  console.log("IP:\t" + request.ip);
  console.log("");
  cb();
};
