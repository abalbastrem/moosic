const pg = require('pg');

const dbCfg = {
  dbip: '127.0.0.1',
  dbclient: 'postgresql',
  dbport: '5432', // postgresql port
  dbname: 'moosic_final',
  dbusername: 'albert',
  dbpassword: 'jupiter'
};

const dbConStr = dbCfg.dbclient + '://' + dbCfg.dbusername + ':' + dbCfg.dbpassword + '@' + dbCfg.dbip + ':' + dbCfg.dbport + '/' + dbCfg.dbname;

exports.client = new pg.Client(dbConStr);
