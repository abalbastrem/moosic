const con = require('./connection');

exports.get = async function(tagArray) {
  try {
    var text = "";
    text += "SELECT array_to_json(array_agg(tracks)) ";
    text += "FROM tracks JOIN tags ON tracks.id=tags.id_track JOIN leyenda_tags ON tags.id_leyenda_tag=leyenda_tags.id ";
    text += "WHERE tags.id_leyenda_tag IN (SELECT leyenda_tags.genre FROM leyenda_tags WHERE ";
    for (let i = 1; i < tagArray.length+1; i++) {
      text += "nombre ILIKE $" + i;
      if (i != tagArray.length) {
        text += " OR ";
      }
    }
    text += ") LIMIT 100";
    console.log("::::: TEXT: " + text);
    const res = await con.pgClient.query(text, tagArray);
    // console.log("::::: IN GET:\n" + JSON.stringify(res.rows[0].array_to_json));
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
    text += "VALUES ($1, $2, $3, md5($4), $5, $6)";
    var values = [];
    values.push(jsonObj.name);
    values.push(jsonObj.lastname);
    values.push(jsonObj.username);
    values.push(jsonObj.password);
    values.push(jsonObj.email);
    values.push(jsonObj.sex);
    await con.pgClient.query(text, values);
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
    var values = [];
    values.push(jsonObj.id_user);
    values.push(jsonObj.id_track);
    values.push(jsonObj.vote);
    values.push(jsonObj.tag);
    const res = await con.pgClient.query(text, values);
    return res;
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
exports.track2playlist = async function(jsonObj) {
  try {
    var text = "";
    var values = [];
    values.push(jsonObj.id_user);
    values.push(jsonObj.id_track);
    await con.pgClient.query(text, values);
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// Removes tracks from playlist
exports.unfavoriteTrack = async function(jsonObj) {
  try {
    var text = "";
    var values = [];
    values.push(jsonObj.id_user);
    values.push(jsonObj.id_track);
    await con.pgClient.query(text, values);
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.userPlaylist = async function(jsonObj) {
  try {
    var text = "";
    const res = await con.pgClient.query(text, jsonObj.id_user);
    return res;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};
