const con = require('./connection');
// console.log(con);

exports.testdb = async function() {
  try {
    await con.pgtest();
    var resultJson = await con.pgClient.query('SELECT row_to_json(tracks) FROM tracks LIMIT 3');
    console.log("::::: JSON IN METHOD: " + JSON.stringify(resultJson.rows[0].row_to_json,null,2));
    return resultJson;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.get = async function(tagArray) {
  var text = "";
  text += "SELECT tracks.id, tracks.name ";
  text += "FROM tracks JOIN tags ON tracks.id=tags.id_track JOIN leyenda_tags ON tags.id_leyenda_tag=leyenda_tags.id ";
  text += "WHERE tags.id_leyenda_tag IN (select leyenda_tags.genre from leyenda_tags WHERE";
  for (let i = 0; i < tagArray.length; i++) {
    text += "nombre ilike $" + i;
    if (i != tagArray.length - 1) {
      text += " OR ";
    }
  }
  text += ") LIMIT 10";
  var query = {
    text: text,
    values: tagArray
  };
  return query;
};

exports.buildJson = async function(result) {
  return jSonObj;
}

exports.jsonTrack2sql = function(jsonTrack) {
  var params = [jsonTrack.id, jsonTrack.name, jsonTrack.duration, jsonTrack.releasedate, jsonTrack.artist_id, jsonTrack.artist_name, jsonTrack.album_image, jsonTrack.audio, jsonTrack.audiodownload, jsonTrack.image, jsonTrack.album_name, jsonTrack.shorturl];
  var text = "INSERT INTO tracks (id, name, duration, releasedate, artist_id, artist_name, album_image, audio, audiodownload, image, album_name, shorturl) VALUES (";
  text += "$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ";
  text += "ON CONFLICT (id) DO NOTHING";
  var query = {
    text: text,
    values: params
  };
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
    var query = {
      text: text,
      values: params
    };
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
