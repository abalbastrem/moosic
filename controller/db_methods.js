const con = require('./connection');
// console.log(con);

exports.testdb = async function() {
  try {
    // con.pgp.connect()
    // .then(obj => {
    //     obj.done(); // success, release the connection;
    //     console.log("Connection succesful");
    //   })
    //   .catch(error => {
    //     console.error('ERROR:', error.message || error);
    //   });
    // await con.pgptest();
    await con.pgtest();
    // console.log("::::: test query to database");
    // var result = await con.pgp.query('SELECT $1:name FROM $2:name', ['id', 'tags']);
    // console.log("::::: RESULT: " + result);
    // var result = await con.pgp.query('SELECT now()');
    // console.log("::::: RESULT: " + result);
    // console.log("::::: in method after query");
    // var ret = "";
    // result.rows.forEach(function(element) {
    //   // console.log(element.name);
    //   ret += element.name + " ";
    // });
    // console.log("::::: test query finished");
    // console.log("::::: in function RESPONSE:\n" + ret);
    var result = await con.pgClient.query('SELECT id_leyenda_tag FROM tags LIMIT 3');
    console.log(result.rows);
    return result;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.jsonTrack2sql = function(jsonTrack) {
  var params = [jsonTrack.id, jsonTrack.name, jsonTrack.duration, jsonTrack.releasedate, jsonTrack.artist_id, jsonTrack.artist_name, jsonTrack.album_image, jsonTrack.audio, jsonTrack.audiodownload, jsonTrack.image, jsonTrack.album_name, jsonTrack.shorturl];
  var text = "INSERT INTO tracks (id, name, duration, releasedate, artist_id, artist_name, album_image, audio, audiodownload, image, album_name, shorturl) VALUES (";
  text += "$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ";
  text += "ON CONFLICT (id) DO NOTHING";
  var query = { text: text, values: params};
  // console.log("::::: QUERY: " + JSON.stringify(query,null,2));
  // return [query, params];
  return query;
};

exports.jsonTags2sql = function(jsonTrack) {
  var queryArray = [];
  var id_track = jsonTrack.id;
  for (let genre of jsonTrack.musicinfo.tags.genres) {
    var params = [id_track, genre];
    console.log(":::: genre: " + genre);
    var subtext = "(SELECT id FROM leyenda_tags WHERE nombre ILIKE $2)";
    var text = "INSERT INTO tags (id_track, id_leyenda_tag) VALUES ($1, " + subtext + ") ON CONFLICT (id_track, id_leyenda_tag) DO NOTHING";
    // console.log(":::::  SUB: " + subquery);
    // console.log("::::: QUERY: " + query);
    var query = { text: text, values: params};
    queryArray.push(query);
  }
  return queryArray;
};

exports.insertTrack = async function(SQLtrack) {
  console.log("::::: inserting track into database");
  try {
    await con.pgClient.query(SQLtrack);
    console.log("::::: track inserted");
  } catch (e) {
    console.error("::::: ERROR while inserting track: " + e);
  }
};

exports.insertTags = async function(SQLtags) {
  console.log("::::: inserting array of tags into database");
  try {
    for (let SQLquery of SQLtags) {
      await con.pgClient.query(SQLquery);
      console.log("::::: tag inserted");
    }
  } catch (e) {
    console.error("::::: ERROR while inserting tag: " + e);
  }
};
