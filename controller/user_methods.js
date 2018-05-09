const con = require('./connection');

// Returns most popular tags when the first moosic is clicked
exports.blindStart = async function() {
  try {
    var text = "SELECT array_to_json(array_agg(nombre)) FROM top_tags";
    const res = await con.pgClient.query(text);
    return res.rows[0].array_to_json;
  } catch (e) {
    console.log("ERROR: " + e);
  }
}

// returns moosics based on tags input
exports.getMoosics = async function(tagArray) {
  try {
    var text = "SELECT array_to_json(array_agg(tracks)) ";
    text += "FROM tracks JOIN (SELECT * FROM (SELECT tracks.id, array_agg(leyenda_tags.nombre) AS tags ";
    text += "FROM tracks JOIN tags ON tracks.id=tags.id_track ";
    text += "JOIN leyenda_tags ON leyenda_tags.id=tags.id_leyenda_tag GROUP BY tracks.id) AS tabla ";
    text += "WHERE tags @> ($1::varchar[])) AS tabla_general ON tabla_general.id=tracks.id;"
    var values = [];
    values.push(tagArray);
    const res = await con.pgClient.query(text, values);
    return res.rows[0].array_to_json;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// returns most popular tags that coexist with input tags
exports.getTags = async function(tagArray) {
  try {
    var text = "SELECT tags AS tag, COUNT(tags) AS cantidad ";
    text += "FROM (SELECT tracks.id, leyenda_tags.nombre AS tags ";
    text += "FROM tracks ";
    text += "JOIN tags ON tracks.id = tags.id_track ";
    text += "JOIN leyenda_tags ON leyenda_tags.id=tags.id_leyenda_tag ";
    text += "WHERE tracks.id IN (SELECT tracks.id ";
    text += "FROM tracks ";
    text += "JOIN tags ON tracks.id=tags.id_track JOIN leyenda_tags ON leyenda_tags.id=tags.id_leyenda_tag ";
    text += "WHERE tracks.id IN (SELECT id AS tags ";
    text += "FROM (SELECT tracks.id, array_agg(leyenda_tags.nombre) AS tags ";
    text += "FROM tracks JOIN tags ON tracks.id = tags.id_track JOIN leyenda_tags ON leyenda_tags.id=tags.id_leyenda_tag ";
    text += "GROUP BY tracks.id) AS tabla_1 WHERE tags @> ($1::varchar[])))) AS tabla_2 ";
    text += "GROUP BY tags ORDER BY cantidad DESC OFFSET $2";
    var values = [];
    values.push(tagArray);
    values.push(tagArray.length);
    const res = await con.pgClient.query(text, values);
    return res.rows;
  } catch (e) {
    console.log("ERROR: " + e);
  }
}

// Checks if user is already present in the database
exports.userExists = async function(jsonObj) {
  try {
    // console.log("::::: IN USER EXISTS:\n" + JSON.stringify(jsonObj));
    var text = "";
    text += "SELECT * FROM USERS WHERE username=$1";
    var values = [];
    values.push(jsonObj.username);
    const res = await con.pgClient.query(text, values);
    if (res.rows[0] == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.signUp = async function(jsonObj) {
  try {
    var text = "";
    text += "INSERT INTO users (name, lastname, username, password, email, sex) ";
    text += "VALUES ($1, $2, $3, md5($4), $5, $6) ";
    text += "RETURNING true";
    var values = [];
    values.push(jsonObj.name);
    values.push(jsonObj.lastname);
    values.push(jsonObj.username);
    values.push(jsonObj.password);
    values.push(jsonObj.email);
    values.push(jsonObj.sex);
    if (await con.pgClient.query(text, values)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.logIn = async function(jsonObj) {
  try {
    console.log("::::: IN LOGIN:\n" + JSON.stringify(jsonObj));
    var text = "";
    text += "SELECT row_to_json(users) FROM users ";
    text += "WHERE username=$1 AND password=md5($2)";
    var values = [];
    values.push(jsonObj.username);
    values.push(jsonObj.password);
    const res = await con.pgClient.query(text, values);
    if (res.rows[0] == undefined) {
      return null;
    } else {
      // console.log("::::: AFTER LOGGED IN:\n" + JSON.stringify(res.rows[0].row_to_json));
      return res.rows[0].row_to_json;
    }
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// Checks whether user should vote
exports.beforeVote = async function(jsonObj) {
  try {
    var text = "";
    text += "SELECT array_agg(nombre) FROM ";
    text += "(SELECT tags.id, leyenda_tags.nombre, COUNT(*) AS votos FROM ";
    text += "votos_tag JOIN tags ON votos_tag.id_tags = tags.id ";
    text += "JOIN tracks ON tags.id_track = tracks.id ";
    text += "JOIN leyenda_tags ON leyenda_tags.id = tags.id_leyenda_tag ";
    text += "WHERE tracks.id = $2 and votos_tag.id_tags NOT IN ";
    text += "(SELECT votos_tag.id_tags AS votos FROM votos_tag ";
    text += "JOIN tags ON votos_tag.id_tags = tags.id ";
    text += "JOIN tracks ON tags.id_track = tracks.id ";
    text += "WHERE tracks.id = $2 AND votos_tag.id_users = $1) ";
    text += "GROUP BY tags.id, leyenda_tags.nombre HAVING COUNT(*) < 5 ";
    text += "ORDER BY votos ASC) AS result";
    var values = [];
    values.push(jsonObj.id_user);
    values.push(jsonObj.id_track);
    const res = await con.pgClient.query(text, values);
    return res.rows[0].array_agg;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// Votes for tag
exports.vote = async function(jsonObj) {
  try {
    var text = "";
    text += "INSERT INTO votos_tag (id_tags, vote, id_users) ";
    text += "SELECT * FROM (SELECT tags.id, CAST($3 AS VOTE) AS vote, ";
    text += "CAST($1 AS INTEGER) AS id_user FROM tags ";
    text += "JOIN leyenda_tags ON tags.id_leyenda_tag = tags.id ";
    text += "WHERE leyenda_tags.nombre ILIKE $4 AND id_track = $2) AS result ";
    text += "ON CONFLICT (id_tags, id_users) DO UPDATE SET vote = excluded.vote";
    var values = [];
    values.push(jsonObj.id_user);
    values.push(jsonObj.id_track);
    values.push(jsonObj.vote);
    values.push(jsonObj.tag);
    await con.pgClient.query(text, values);
    return;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.hasUserVotedMoods = async function(jsonObj) {
  try {
    var text = "SELECT moods.id_track, votos_moods.id_user, votos_moods.vote, leyenda_mood.nombre ";
    text += "FROM votos_moods ";
    text += "JOIN moods ON votos_moods.id_moods = moods.id ";
    text += "JOIN leyenda_mood ON leyenda_mood.id = moods.id_leyenda_mood ";
    text += "WHERE moods.id_track = $1 AND id_user = $2";
    var values = [];
    values.push(jsonObj.id_track);
    values.push(jsonObj.id_user);
    const res = await con.pgClient.query(text, values);
    console.log("::::: HAS USER VOTED MOODS? ", res.rows[0]);
    if (res.rows[0] == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.whichMoodsToVote = async function() {
  try {
    var text = "SELECT array_to_json(array_agg(nombre)) from leyenda_mood";
    const res = await con.pgClient.query(text);
    console.log("::::: WHICH MOODS TO VOTE: \n" + JSON.stringify(res.rows[0].array_to_json));
    return res.rows[0].array_to_json;
  } catch (e) {
    console.error("ERROR: " + e);
  }
}

// Votes for moods
exports.moods = async function(jsonObj) {
  try {
    for (let i = 0; i < jsonObj.moods_like.length; i++) {
      console.log("::::: TAG: " + jsonObj.moods_like[i]);
      var text1 = "INSERT INTO moods (id_leyenda_mood, id_track) ";
      text1 += "SELECT id, cast($1 AS INTEGER) FROM ";
      text1 += "leyenda_mood WHERE nombre ILIKE $2 ";
      text1 += "ON CONFLICT (id_leyenda_mood, id_track) DO NOTHING ";
      text1 += "RETURNING true";
      var values1 = [];
      values1.push(jsonObj.id_track);
      values1.push(jsonObj.moods_like[i]);
      var text2 = "INSERT INTO votos_moods (id_moods, vote, id_user) ";
      text2 += "SELECT moods.id, cast('like' AS vote_mood), CAST($1 AS BIGINT) AS id_user ";
      text2 += "FROM moods JOIN leyenda_mood ON moods.id_leyenda_mood = leyenda_mood.id ";
      text2 += "WHERE moods.id_track = $2 AND leyenda_mood.nombre ILIKE $3 ";
      text2 += "ON CONFLICT (id_moods, id_user) DO UPDATE SET vote = excluded.vote ";
      text2 += "RETURNING true";
      var values2 = [];
      values2.push(jsonObj.id_user);
      values2.push(jsonObj.id_track);
      values2.push(jsonObj.moods_like[i]);
      res1 = await con.pgClient.query(text1, values1); // may return true or nothing
      console.log("::::: RES1: ", res1.rows[0]);
      res2 = await con.pgClient.query(text2, values2);
      console.log("::::: RES2: ", res2.rows[0]);
      if (!res2.rows[0]) {
        return false;
      }
    } // end for
    for (let i = 0; i < jsonObj.moods_zero.length; i++) {
      console.log("::::: TAG: " + jsonObj.moods_zero[i]);
      var text1 = "INSERT INTO moods (id_leyenda_mood, id_track) ";
      text1 += "SELECT id, cast($1 AS INTEGER) FROM ";
      text1 += "leyenda_mood WHERE nombre ILIKE $2 ";
      text1 += "ON CONFLICT (id_leyenda_mood, id_track) DO NOTHING ";
      text1 += "RETURNING true";
      var values1 = [];
      values1.push(jsonObj.id_track);
      values1.push(jsonObj.moods_zero[i]);
      var text2 = "INSERT INTO votos_moods (id_moods, vote, id_user) ";
      text2 += "SELECT moods.id, cast('zero' AS vote_mood), CAST($1 AS BIGINT) AS id_user ";
      text2 += "FROM moods JOIN leyenda_mood ON moods.id_leyenda_mood = leyenda_mood.id ";
      text2 += "WHERE moods.id_track = $2 AND leyenda_mood.nombre ILIKE $3 ";
      text2 += "ON CONFLICT (id_moods, id_user) DO UPDATE SET vote = excluded.vote ";
      text2 += "RETURNING true";
      var values2 = [];
      values2.push(jsonObj.id_user);
      values2.push(jsonObj.id_track);
      values2.push(jsonObj.moods_zero[i]);
      res1 = await con.pgClient.query(text1, values1);
      console.log("::::: RES1: ", res1.rows[0]);
      res2 = await con.pgClient.query(text2, values2);
      console.log("::::: RES2: ", res2.rows[0]);
      if (!res2.rows[0]) {
        return false;
      }
    } // end for
    return true;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// Adds track to playlist
exports.favoriteTrack = async function(jsonObj) {
  try {
    var text = "";
    text += "INSERT INTO playlist_songs (playlist_id, tracks_id) ";
    text += "SELECT playlist.id, CAST($2 AS INTEGER) ";
    text += "FROM playlist WHERE playlist.users_id = $1 ";
    text += "RETURNING true";
    var values = [];
    values.push(jsonObj.id_user);
    values.push(jsonObj.id_track);
    const res = await con.pgClient.query(text, values);
    if (res) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// Removes track from playlist
exports.unfavoriteTrack = async function(jsonObj) {
  try {
    var text = "";
    text += "DELETE FROM playlist_songs ";
    text += "WHERE playlist_id = (SELECT playlist.id FROM playlist WHERE users_id = $1) ";
    text += "AND tracks_id = $2 ";
    text += "RETURNING *";
    var values = [];
    values.push(jsonObj.id_user);
    values.push(jsonObj.id_track);
    const res = await con.pgClient.query(text, values);
    if (res.rows.length == 1) {
      return true;
    } else {
      return false;
    }
    console.log("::::: RES: " + res);
    if (res) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.userFavorites = async function(jsonObj) {
  try {
    var text = "";
    text += "SELECT array_to_json(array_agg(tracks)) FROM tracks ";
    text += "JOIN playlist_songs ON tracks.id = playlist_songs.tracks_id ";
    text += "JOIN playlist ON playlist.id = playlist_songs.playlist_id ";
    text += "WHERE playlist.users_id = $1";
    const res = await con.pgClient.query(text, [jsonObj.id_user]);
    console.log("::::: JSONACO: " + JSON.stringify(res.rows[0].array_to_json, null, 2));
    return res.rows[0].array_to_json;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};
