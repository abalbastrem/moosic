const pg = require('pg');
// var pgp = require('pg-promise')();
// const GLOBALS = require('./setup');
// console.log(GLOBALS.DBCONFIG);

const dbCon = {
  host: '192.168.1.18',
  type: 'postgresql',
  port: 5432, // postgresql port
  database: 'moosic_final',
  user: 'albert',
  password: 'jupiter'
};

const dbConStr = dbCon.type + '://' + dbCon.user + ':' + dbCon.password + '@' + dbCon.host + ':' + dbCon.port + '/' + dbCon.database;

// PG - for initial and weekly dump
var pgClient = new pg.Client(dbConStr);
pgClient.connect();
exports.pgClient = pgClient;
console.log("::::: PG CLIENT CONNECTED :::::");

// PGPROMISE - for user interaction from views
// var pgpClient = pgp(dbCfg);

// pg.connect()
//   .then(obj => {
//     obj.done(); // success, release the connection;
//     console.log("Connection succesful");
//   })
//   .catch(error => {
//     console.error('ERROR:', error.message || error);
//   });

// TESTCHECK
exports.pgptest = async function() {
  for (let i = 0; i < 3; i++) {
    var res = await pgpClient.query('SELECT now()');
    console.log(res);
    var res = await pgpClient.query('SELECT $1:name FROM $2:name', ['id_track', 'tags']);
    console.log(res);
  }
};

exports.pgtest = async function() {
  // var res = await pg.query('SELECT now()');
  // console.log(res);
  // var res = await pg.query('SELECT $1:name FROM $2:name', ['id_track', 'tags']);
  var res = await pgClient.query('SELECT id_track FROM tags LIMIT 3');
  console.log(res.rows);
  // await sleep();
  // var res = await pg.query('SELECT $1:name FROM $2:name', ['id_leyenda_tag', 'tags']);
  // console.log(res);

};

//
// function sleep() {
//   pgpTest();
//   setTimeout(function() {
//     pgpTest();
//     console.log("sleeping...");
//   }, 5000)
// };



// exports.pgp = client;
// exports.client = client;
// module.exports = pg;
