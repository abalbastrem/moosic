const con = require('./connection');
var pgp = require('pg-promise')();
// const pgp = con.pgp;
console.log(con.pgp);

exports.testdb = async function() {
  try {
    console.log("::::: test query to database");
    var result = await con.pgp.any('SELECT $1:name FROM $2:name', ['id', 'tags']);
    console.log("::::: RESULT: " + result);
    var result = await con.pgp.one('SELECT now()');
    console.log("::::: in method after query");
    console.log("::::: RESULT: " + result);
    var ret = "";
    result.rows.forEach(function(element) {
      // console.log(element.name);
      ret += element.name + " ";
    });
    console.log("::::: test query finished");
    console.log("::::: in function RESPONSE:\n" + ret);
    return ret;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.insert = async function(SQLtrack, SQLtags) {
  console.log("::::: inserting array of tracks & tags into database");
  try {
    //
  } catch (e) {
    console.error("ERROR while inserting: " + e);
  }
};

exports.insertTrack = async function(SQLtrack) {
  console.log("::::: inserting track into database");
  try {
    // await db0.client.connect();
    // await db0.client.query(SQLtrack);
    // await db0.client.end();
    await db0.query(SQLtrack);
  } catch (e) {
    console.error("::::: ERROR while inserting track: " + e);
  }
};

exports.insertTags = async function(SQLtags) {
  console.log("::::: inserting array of tags into database");
  try {
    // await db0.client.connect();
    for (let query of SQLtags) {
      // await db0.client.query(query);

    }
    // await db0.client.end();
  } catch (e) {
    console.error("::::: ERROR while inserting track: " + e);
  }
};

exports.jsonTrack2sql = function(jsonTrack) {
  var queryArray = [];
  var query = "INSERT INTO tracks (id, name, artist_id, artist_name, album_image, audio, audiodownload, image, album_name, shorturl) VALUES (";
  query += jsonTrack.id + ",";
  query += "'" + jsonTrack.name + "'" + ",";
  query += jsonTrack.artist_id + ",";
  query += "'" + jsonTrack.artist_name + "'" + ",";
  query += "'" + jsonTrack.album_image + "'" + ",";
  query += "'" + jsonTrack.audio + "'" + ",";
  query += "'" + jsonTrack.audiodownload + "'" + ",";
  query += "'" + jsonTrack.image + "'" + ",";
  query += "'" + jsonTrack.album_name + "'" + ",";
  query += "'" + jsonTrack.shorturl + "'";
  query += ") ";
  query += "ON CONFLICT (id) DO NOTHING";
  console.log("::::: QUERY: " + query);
  return query;
};

exports.jsonTags2sql = function(jsonTrack) {
  var queryArray = [];
  var id_track = jsonTrack.id;
  for (let genre of jsonTrack.musicinfo.tags.genres) {
    var subquery = "(SELECT id FROM leyenda_tags WHERE nombre ILIKE '" + genre + "')";
    var query = "INSERT INTO tags (id_track, id_leyenda_tag) VALUES (" + id_track + ", " + subquery + ")";
    // console.log(":::::  SUB: " + subquery);
    console.log("::::: QUERY: " + query);
    queryArray.push(query);
  }
  return queryArray;
};