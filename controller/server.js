/// PROJECT GLOBALS SETUP ///
// async function setup() {
//   try {
//     const GLOBALS = require('./setup');
//     const methods = require('./methods');
//     const jamendo = require('./jamendo_methods');
//     console.log("::::: PROJECT SET UP SUCCESSFULLY :::::");
//   } catch (e) {
//     console.log("::::: SETUP FAILED: " + e);
//   }
// };

// setup();

const GLOBALS = require('./setup');
const methods = require('./methods');
const jamendo = require('./jamendo_methods');
console.log("::::: PROJECT SET UP SUCCESSFULLY :::::");

/// SERVER CONFIG ///
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bcrypt = require('bcryptjs');
const requestify = require('requestify');
const SQLBuilder = require('json-sql-builder2');
const pg = require('pg');
server.listen(8888);
console.log("::::: SERVER ONLINE :::::");

/// HANDLERS ///
app.get('/', function(request, response) {
  log(request, response);
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
    console.log("::::: in handler RESPONSE:\n" + ret);
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

app.get('/get', async function(request, response) {
  log(request, response);
  try {
    var url = jamendo.urlBuilder();
    var ret = await methods.get(url);
    console.log("::::: in handler RESPONSE:\n" + ret);
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

app.get('/get2', function(request, response) {
  var ret = "";
  log(request, response);
  var url = jamendo.urlBuilderOLD();
  console.log(url);
  jamendo.get2(request, response, url, jamendo.cbReturnFromApi);
});

/// THE D U M P ///
async function apiOneTag(tag) {
  try {
    var url = jamendo.urlBuilder(tag);
    tracks += await jamendo.api(url);
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

async function apiAllTags() {
  var n = 0;
  var tracksArray = [];
  var tracksJson = {};
  var json = {};
  try {
    GLOBALS.TAGS.forEach(async function(tag) {
      if (tag != "") {
        console.log("::::: tag: " + tag);
        var url = jamendo.urlBuilder(tag);
        // console.log("::::: " + url);
        json = await jamendo.api(url);
        console.log("::::: json: " + json + JSON.stringify(json));
        tracksArray.push(json);
        tracksJson[tag] = json;
        // console.log("::::: " + tracksArray.size);
        // } else if (tag == "EOF") {
        //   return tracksJson;
        console.log(":::::" + ++n + " de cuatro tags");
      }
    });
    // return tracksJson;
    console.log("::::: esto debería imprimirse al acabar el forEach, pero no");
    // console.log("::::: TRACKSARRAY:\n " + tracksArray);
    // console.log("::::: TRACKSJSON:\n " + JSON.stringify(tracksJson,null,2));
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// function dumpApi() {
//   GLOBALS.TAGS.forEach(function(tag) {
//     if (tag != "") {
//       console.log("*** " + tag + " ***");
//       apiOneTag(tag);
//     }
//   });
//   console.log(tracks);
// };

// dumpApi();

async function newSQL() {
  const jsonSQL = await apiAllTags();
  console.log(JSON.stringify(jsonSQL, null, 2));
};

newSQL();

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
