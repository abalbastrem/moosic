/// SERVER CONFIG ///
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bcrypt = require('bcryptjs');
// var logger = require('./log');
// logger.info('error log started');
const pg = require('pg');
const dbCfg = require('./dbcfg');
// const pgpromise = require('pg-promise');
server.listen(8888);

console.log("::::: SERVER ONLINE :::::");

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
}

/// DB CONNECTION ///
const dbCfgStr = dbCfg.dbclient + '://' + dbCfg.dbusername + ':' + dbCfg.dbpassword + '@' + dbCfg.dbip + ':' + dbCfg.dbport + '/' + dbCfg.dbname;
const client = new pg.Client(dbCfgStr);

async function testdb() {
  try {
    console.log("::::: test query to database");
    await client.connect();
    var res = await client.query("SELECT * FROM genero");
    res.rows.forEach(function(element) {
      console.log(element.name);
    })
    await client.query("CREATE TABLE tablatest(col1 text, col2 text, col3 text)");
    await client.query("INSERT INTO tablatest(col1, col2, col3) VALUES('pedro','romero','pakistan')");
    await client.end();
    console.log("::::: test query finished");
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

app.get('/testdb', function(request, response) {
  log(request, response);
  testdb();
});

// general use
app.post('/get', function(request, response) {
  log(request, response);
  get(args);
});

/// FROM JAMENDO ///
const JAMENDO_KEY = "e106f235";

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

getJSON('https://www.googleapis.com/freebase/v1/text/en/bob_dylan').then(function(data) {
  alert('Your Json result is:  ' + data.result); //you can comment this, i used it to debug
  var res = data.result; //display the result in an HTML element
}, function(status) { //error detection....
  alert('Something went wrong.');
});

async function testdump() {
  try {
    $.get("https://api.jamendo.com/v3.0/tracks/?client_id=e106f235&format=jsonpretty&limit=10&include=musicinfo&groupby=artist_id", function(data, status) {
      console.log(data);
    }, 'html');
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// testdump();


/// MODEL ///
// var tracks = require('tracksmodel');

/// HANDLERS ///

function wrapper(request, response, cb) {
  console.log("REQ " + ++n + "\t" + new Date().toISOString());
  console.log("PATH:\t" + request.route.path);
  console.log("URL:\t" + request.originalUrl);
  console.log("IP:\t" + request.ip);
  console.log("");
  cb();
}

app.get('/', function(request, response) {
  // log(request, response);
  wrapper(request, response, this);
  response.write('hello world');
  response.end();
});

app.get('/test', function(request, response) {
  log(request, response);

})
