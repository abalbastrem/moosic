// const pg = require('pg');
var pgp = require('pg-promise')();
const GLOBALS = require('./setup');
// console.log(GLOBALS.DBCONFIG);

const dbCfg = {
  host: '192.168.1.18',
  type: 'postgresql',
  port: 5432, // postgresql port
  database: 'moosic_final',
  user: 'albert',
  password: 'jupiter'
};

// const dbConStr = dbCfg.type + '://' + dbCfg.user + ':' + dbCfg.password + '@' + dbCfg.host + ':' + dbCfg.port + '/' + dbCfg.database;

//PG
// exports.client = new pg.Client(dbConStr);

// PGPROMISE
var pgp = pgp(dbCfg);

pgp.connect()
.then(obj => {
    obj.done(); // success, release the connection;
    console.log("Connection succesful");
  })
  .catch(error => {
    console.error('ERROR:', error.message || error);
  });

// TESTCHECK
async function pgpTest() {
  for (let i = 0; i <= 3; i++) {
    var res = await pgp.query('SELECT now()');
    console.log(res[0]);
    var res = await pgp.query('SELECT $1:name FROM $2:name', ['id', 'tags']);
    console.log(res[0]);
  }
};

// pgpTest();



exports.pgp = pgp;
