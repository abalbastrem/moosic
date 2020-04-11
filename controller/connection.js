const pg = require('pg');
const GLOBALS = require('./setup_globals');
const dbCon = JSON.parse("{" + GLOBALS.DBCONFIG + "}");

const dbMoosicConStr = dbCon.type + '://' + dbCon.user + ':' + dbCon.password + '@' + dbCon.host + ':' + dbCon.port + '/' + dbCon.database;
const dbTemplate1ConStr = dbCon.type + '://' + dbCon.user + ':' + dbCon.password + '@' + dbCon.host + ':' + dbCon.port + '/' + "template1";

const pgClient = new pg.Client(dbMoosicConStr);
pgClient.connect();
exports.pgClient = pgClient;
console.log("::::: PG CLIENT CONNECTED :::::");

// TESTCHECK
// exports.pgptest = async function () {
//     for (let i = 0; i < 3; i++) {
//         var res = await pgpClient.query('SELECT now()');
//         // console.log(res);
//         var res = await pgpClient.query('SELECT $1:name FROM $2:name', ['id_track', 'tags']);
//         // console.log(res);
//     }
// };
//
// exports.pgtest = async function () {
//     var res = await pgClient.query('SELECT id_track FROM tags LIMIT 3');
//     // console.log(res.rows);
// };

exports.getPgClientMoosic = async function () {
    let pgClient = new pg.Client(dbMoosicConStr);
    pgClient.connect();

    return pgClient;
};

exports.getPgClientTemplate1 = async function () {
    let pgClient = new pg.Client(dbTemplate1ConStr);
    pgClient.connect();

    return pgClient;
};
