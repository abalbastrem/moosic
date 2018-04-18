const pg = require('pg');

const dbCfg = {
  dbip: '192.168.1.18',
  dbclient: 'postgresql',
  dbport: '5432', // postgresql port
  dbname: 'moosic',
  dbusername: 'albert',
  dbpassword: 'jupiter'
};

const dbConStr = dbCfg.dbclient + '://' + dbCfg.dbusername + ':' + dbCfg.dbpassword + '@' + dbCfg.dbip + ':' + dbCfg.dbport + '/' + dbCfg.dbname;

exports.client = new pg.Client(dbConStr);
