/// SERVER CONFIG ///
var express = require('express');
var app = express();
var server = require('http').createServer(app);
// var bcrypt = require('bcrypt');
// var logger = require('./log');
// logger.info('error log started');
var pg = require('pg');
var pgpromise = require('pg-promise');
server.listen(8888);

console.log("::::: SERVER ONLINE :::::");

/// QUICK LOG ///
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

/// DB CONNECTION ///
var conCfg = {
  dbip: '192.168.1.18',
  dbclient: 'postgresql',
  dbport: '5432', // postgresql port
  dbname: 'moosic',
  dbusername: 'albert',
  dbpassword: 'jupiter'
};
var conStr = conCfg.dbclient + '://' + conCfg.dbusername + ':' + conCfg.dbpassword + '@' + conCfg.dbip + ':' + conCfg.dbport + '/' + conCfg.dbname;
console.log(conStr);

var client = new pg.Client(conStr);

// for (var i = 0; i < 10; i++) {
async function testdb() {
  await client.connect();
  var res = await client.query("SELECT * FROM genero");
  console.log(res);
  await client.end();
};

testdb();
// console.log("::::: CONNECTED TO DATABASE :::::");
// console.log("CONNEXION " + i);
// client.query("INSERT INTO ojete(col1, col2, col3) VALUES('pedro','romero','pakistan')");
// query.on('end', () => {
// });
// }

// const res = client.query('SELECT $1::text as message', ['Hello world!']);
// console.log(res);
// client.end();

// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message); // Hello World!
//   console.log("hola");
//   client.end();
// });

/// MODEL ///
// var tracks = require('tracksmodel');

/// HANDLERS ///
app.get('/', function(request, response) {
  log(request, response);
  response.write('hello world');
  response.end();
});

app.get('/test', function(request, response) {
  log(request, response);

})
