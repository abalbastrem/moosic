const pg = require('pg');
const pgquery = require('pg-query');
const pgp = require('pg-promise');

const dbCfg = {
  host: '192.168.1.18',
  type: 'postgresql',
  port: '5432', // postgresql port
  database: 'moosic_final',
  user: 'albert',
  password: 'jupiter'
};

const dbConStr = dbCfg.type + '://' + dbCfg.user + ':' + dbCfg.password + '@' + dbCfg.host + ':' + dbCfg.port + '/' + dbCfg.database;

//PG
exports.client = new pg.Client(dbConStr);

//PGQUERY
pgquery.connectionParameters = dbConStr;

pgquery('SELECT NOW()', function(err, rows, result) {
  console.error(err);
  console.log(result);
  console.log(rows);
});

exports.pgquery = pgquery;

pgquery.first('SELECT NOW()');

// PGPROMISE
db = pgp(dbCfg);

db.any('SELECT * FROM tags');
