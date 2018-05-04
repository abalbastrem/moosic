const con = require('./connection');

exports.get = async function(tagArray) {
  try {
    var text = "";
    text += "SELECT array_to_json(array_agg(tracks)) ";
    text += "FROM tracks JOIN tags ON tracks.id=tags.id_track JOIN leyenda_tags ON tags.id_leyenda_tag=leyenda_tags.id ";
    text += "WHERE tags.id_leyenda_tag IN (SELECT leyenda_tags.genre FROM leyenda_tags WHERE ";
    for (let i = 1; i < tagArray.length + 1; i++) {
      text += "nombre ILIKE $" + i;
      if (i != tagArray.length) {
        text += " OR ";
      }
    }
    text += ")";
    console.log("::::: TEXT: " + text);
    const res = await con.pgClient.query(text, tagArray);
    return res.rows[0].array_to_json;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// Checks if user is already present in the database
exports.userExists = async function(jsonObj) {
  try {
    console.log("::::: IN USER EXISTS:\n" + JSON.stringify(jsonObj));
    var text = "";
    text += "SELECT * FROM USERS WHERE username=$1 AND password=md5($2)";
    var values = [];
    values.push(jsonObj.username);
    values.push(jsonObj.password);
    const res = await con.pgClient.query(text, values);
    console.log("::::: IN USER EXISTS:\n" + res);
    if (res.rows[0] == null) {
      console.log("::::: No devuelve user");
      return false;
    } else {
      console.log("::::: Devuelve user");
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
      console.log("::::: AFTER LOGGED IN:\n" + JSON.stringify(res.rows[0].row_to_json));
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
    return res;
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

exports.beforeMoods = async function(jsonObj) {
  try {
    var text = "";
    var values = [];
    values.push(jsonObj.id_moods);
    values.push(jsonObj.id_user);
    const res = await con.pgClient.query(text, values);
    if (res[0] == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// Votes for moods
exports.moods = async function(jsonObj) {
  try {
    var text = "";
    var values = [];
    values.push(jsonObj.id_moods);
    values.push(jsonObj.vote);
    values.push(jsonObj.id_user);
    const res = await con.pgClient.query(text, values);
    return res;
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
