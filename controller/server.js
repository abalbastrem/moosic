/// PROJECT GLOBALS SETUP ///
const GLOBALS = require('./setup');
const db = require('./db_methods');
const jamendo = require('./jamendo_methods');
console.log("::::: PROJECT GLOBALS SET UP SUCCESSFULLY :::::");

/// SERVER CONFIG ///
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const bcrypt = require('bcryptjs');
const requestify = require('requestify');
const SQLBuilder = require('json-sql-builder2');
const pg = require('pg');
const pgquery = require('pg-query');
server.listen(8888);
console.log("::::: SERVER ONLINE :::::");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
console.log("::::: POST HANDLING ENABLED ::::::");

/// CONNECTION TO DATABASE ///
const con = require('./connection');
// con.pgClient.connect();

/// HANDLERS ///
app.get('/', function(request, response) {
  log(request, response);
  response.write('hello world');
  response.end();
});

app.post('/test', function(request, response) {
  log(request, response);
  response.write('hello world');
  response.write('this is a test with post');
  response.end();
});

app.get('/testdb', async function(request, response) {
  log(request, response);
  try {
    var ret = await db.testdb();
    console.log("::::: in handler RESPONSE:\n" + JSON.stringify(ret, null, 2));
    response.writeHead(200, {
      'Content-type': 'text/html'
    });
    response.write(JSON.stringify(ret, null, 2));
    response.end();
  } catch (e) {
    // response.writeHead(500);
    response.end();
    console.error("ERROR: " + e);
  }
});

app.get('/get', async function(request, response) {
  log(request, response);
  try {
    var tagArray = request.tagArray;
    var trackArray = await db.get(tagArray);
    console.log("::::: in handler RESPONSE:\n" + trackArray);
    response.writeHead(200, {
      'Content-type': 'text/html'
    });
    response.write(trackArray);
    response.end();
  } catch (e) {
    response.writeHead(500);
    response.end();
    console.error("ERROR: " + e);
  }
});

app.get('/get2', function(request, response) {
  var ret = "";
  log(request, response);
  var url = jamendo.urlBuilderOLD();
  console.log(url);
  jamendo.get2(request, response, url, jamendo.cbReturnFromApi);
});

/// THE D U M P ///
async function apiAllTags() {
  var n = 0;
  var tracksArray = [];
  var json = {};
  try {
    for (let tag of GLOBALS.TAGS) {
      if (tag != "") {
        console.log("::::: tag: " + tag);
        var url = jamendo.urlBuilder(tag);
        json = await jamendo.api(url);
        for (let jsonTrack of json) {
          tracksArray.push(jsonTrack);
          console.log("::::: acc json obj length: " + tracksArray.length);
        }
      }
    };
    return tracksArray;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

async function dump() {
  try {
    const jsonArray = await apiAllTags();
    // console.log(JSON.stringify(jsonArray, null, 2));
    console.log("::::: TOTAL TRACK ARRAY COUNT: " + jsonArray.length + " new tracks");
    for (let jsonTrack of jsonArray) {
      console.log("::::: query TRACK");
      let SQLtrack = db.jsonTrack2sql(jsonTrack);
      console.log("::::: query TAGS");
      let SQLtags = db.jsonTags2sql(jsonTrack);
      await db.insertTrack(SQLtrack);
      await db.insertTags(SQLtags);
    }
  } catch (e) {
    console.log("::::: ERROR: " + e);
  }
};

// dump();

/// QUICK LOG ///
var n = 0;

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
