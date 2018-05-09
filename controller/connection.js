const pg = require('pg');
// const GLOBALS = require('./setup_globals');
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
  var res = await pgClient.query('SELECT id_track FROM tags LIMIT 3');
  console.log(res.rows);
};
