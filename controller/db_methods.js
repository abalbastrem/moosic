const db0 = require('./database');

exports.testdb = async function() {
  try {
    // await db0.client.connect();
    // console.log("::::: connected to database");
    console.log("::::: test query to database");
    // var result = await db0.client.query("SELECT now()");
    // var result = await db0.query("SELECT now()", function(err, rows, result) {
    //   assert.equal(rows, result.rows);
    // });
    console.log("::::: RESULT: " + result);
    var ret = "";
    result.rows.forEach(function(element) {
      // console.log(element.name);
      ret += element.name + " ";
    });
    // await db0.client.query("CREATE TABLE tablatest(col1 text, col2 text, col3 text)");
    // await db0.client.query("INSERT INTO tablatest(col1, col2, col3) VALUES('pedro','romero','pakistan')");
    // await db0.client.end();
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
