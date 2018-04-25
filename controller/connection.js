const baix = require('pg');
// var pgp = require('pg-promise')();
// const GLOBALS = require('./setup');
// console.log(GLOBALS.DBCONFIG);

const dbCfg = {
  host: 'localhost',
  type: 'postgresql',
  port: 5432, // postgresql port
  database: 'moosic_final',
  user: 'albert',
  password: 'jupiter'
};

const dbConStr = dbCfg.type + '://' + dbCfg.user + ':' + dbCfg.password + '@' + dbCfg.host + ':' + dbCfg.port + '/' + dbCfg.database;

//PG
// exports.client = new pg.Client(dbConStr);

// PGPROMISE
// var pg = pgp(dbCfg);
var client = new baix.Client(dbConStr);
client.connect();

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
    var res = await pg.query('SELECT now()');
    console.log(res);
    var res = await pg.query('SELECT $1:name FROM $2:name', ['id_track', 'tags']);
    console.log(res);
  }
};

exports.clienttest = async function() {
  // var res = await pg.query('SELECT now()');
  // console.log(res);
  // var res = await pg.query('SELECT $1:name FROM $2:name', ['id_track', 'tags']);
  for (let i = 0; i < 3; i++) {
  var res = await client.query('SELECT id_track FROM tags');
  console.log(res.rows);
  }
  // await sleep();
  // var res = await pg.query('SELECT $1:name FROM $2:name', ['id_leyenda_tag', 'tags']);
  // console.log(res);

};


function sleep() {
  pgpTest();
  setTimeout(function() {
    pgpTest();
    console.log("sleeping...");
  }, 5000)
};



// exports.pgp = client;
exports.client = client;
// module.exports = pg;
