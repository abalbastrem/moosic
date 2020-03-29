const con = require('./connection');

// Returns most popular tags when the first moosic is clicked
exports.blindStart = async function() {
  try {
    let text = "SELECT array_to_json(array_agg(toptags.name)) FROM toptags";
    let res = await con.pgClient.query(text);
    // console.log("::::: " + JSON.stringify(res.rows[0].array_to_json, null, 2));
    return res.rows[0].array_to_json;
  } catch (e) {
    console.log("ERROR: " + e);
  }
}

// returns moosics based on tags input
exports.getMoosics = async function(tagArray) {
  try {
    let text = "SELECT array_to_json(array_agg(moosics)) ";
    text += "FROM moosics JOIN (SELECT * FROM (SELECT moosics.id, array_agg(taginfo.name) AS tags ";
    text += "FROM moosics JOIN tags ON moosics.id=tags.moosics_id ";
    text += "JOIN taginfo ON taginfo.id=tags.taginfo_id GROUP BY moosics.id) AS ttable ";
    text += "WHERE tags @> ($1::varchar[])) AS general_table ON general_table.id=moosics.id";
    let values = [];
    values.push(tagArray);
    let res = await con.pgClient.query(text, values);
    return res.rows[0].array_to_json;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// returns most popular tags that coexist with input tags
exports.getTags = async function(tagArray) {
  try {
    let text = "SELECT tags AS tag, COUNT(tags) AS quantity ";
    text += "FROM (SELECT moosics.id, taginfo.name AS tags ";
    text += "FROM moosics ";
    text += "JOIN tags ON moosics.id = tags.moosics_id ";
    text += "JOIN taginfo ON taginfo.id=tags.taginfo_id ";
    text += "WHERE moosics.id IN (SELECT moosics.id ";
    text += "FROM moosics ";
    text += "JOIN tags ON moosics.id=tags.moosics_id JOIN taginfo ON taginfo.id=tags.taginfo_id ";
    text += "WHERE moosics.id IN (SELECT id AS tags ";
    text += "FROM (SELECT moosics.id, array_agg(taginfo.name) AS tags ";
    text += "FROM moosics JOIN tags ON moosics.id = tags.moosics_id JOIN taginfo ON taginfo.id=tags.taginfo_id ";
    text += "GROUP BY moosics.id) AS table_1 WHERE tags @> ($1::varchar[])))) AS table_2 ";
    text += "GROUP BY tags ORDER BY quantity DESC OFFSET $2";
    let values = [];
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
    let text = "";
    text += "SELECT * FROM USERS WHERE username=$1";
    let values = [];
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
    let text = "";
    text += "INSERT INTO users (name, lastname, username, password, email, sex) ";
    text += "VALUES ($1, $2, $3, md5($4), $5, $6) ";
    text += "RETURNING true";
    let values = [];
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
    let text = "";
    text += "SELECT row_to_json(users) FROM users ";
    text += "WHERE username=$1 AND password=md5($2)";
    let values = [];
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

exports.createFavoorites = async function(jsonObj) {
  try {
    let text = "";
    text += "insert into playlist(title, users_id) ";
    text += "select 'favoorites', users.id from users ";
    text += "where users.username ilike $1 ";
    // text += "on conflict(users_id) do nothing returning true";
    let values = [];
    values.push(jsonObj.username);
    if (await con.pgClient.query(text, values)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error("ERROR: " + e);
  }
}

// Checks whether user should vote
exports.beforeVote = async function(jsonObj) {
  try {
    var text = "SELECT array_agg(name) FROM ";
    text += "(SELECT tags.id, taginfo.name ";
    text += "FROM tags JOIN moosics ON tags.moosics_id = moosics.id ";
    text += "JOIN taginfo ON taginfo.id = tags.taginfo_id ";
    text += "WHERE moosics.id = $1 AND tags.id NOT IN ";
    text += "(SELECT * FROM (SELECT tag_votes.tags_id FROM tag_votes ";
    text += "JOIN tags ON tag_votes.tags_id = tags.id JOIN moosics ON tags.moosics_id = moosics.id ";
    text += "WHERE moosics.id = $1 AND tag_votes.users_id = $2) AS tags_user ";
    text += "WHERE tags_user.tags_id IN (SELECT tag_votes.tags_id ";
    text += "FROM tag_votes join tags on tag_votes.tags_id = tags.id join moosics on tags.moosics_id = moosics.id ";
    text += "WHERE moosics.id = $1 group by tag_votes.tags_id having count(tag_votes.tags_id) < 5))) AS result";
    var values = [];
    values.push(jsonObj.id_track);
    values.push(jsonObj.id_user);
    const res = await con.pgClient.query(text, values);
    console.log("::::: METHOD BEFOREVOTE: " + JSON.stringify(res.rows[0].array_agg, null, 2));
    return res.rows[0].array_agg;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

// Votes for tag
exports.vote = async function(jsonObj) {
  try {
    var text = "";
    text += "INSERT INTO tag_votes (tags_id, vote, users_id) ";
    text += "SELECT * FROM (SELECT tags.id, CAST($3 AS vote_tag) AS vote, ";
    text += "CAST($1 AS INTEGER) AS users_id FROM tags ";
    text += "JOIN taginfo ON tags.taginfo_id = taginfo.id ";
    text += "WHERE taginfo.name ILIKE $4 AND moosics_id = $2) AS result ";
    text += "ON CONFLICT (tags_id, users_id) DO UPDATE SET vote = excluded.vote";
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
    var text = "SELECT moods.moosics_id, votos_moods.id_user, votos_moods.vote, leyenda_mood.name ";
    text += "FROM votos_moods ";
    text += "JOIN moods ON votos_moods.id_moods = moods.id ";
    text += "JOIN leyenda_mood ON leyenda_mood.id = moods.id_leyenda_mood ";
    text += "WHERE moods.moosics_id = $1 AND id_user = $2";
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
    var text = "SELECT array_to_json(array_agg(name)) from leyenda_mood";
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
      var text1 = "INSERT INTO moods (id_leyenda_mood, moosics_id) ";
      text1 += "SELECT id, cast($1 AS INTEGER) FROM ";
      text1 += "leyenda_mood WHERE name ILIKE $2 ";
      text1 += "ON CONFLICT (id_leyenda_mood, moosics_id) DO NOTHING ";
      text1 += "RETURNING true";
      var values1 = [];
      values1.push(jsonObj.id_track);
      values1.push(jsonObj.moods_like[i]);
      var text2 = "INSERT INTO votos_moods (id_moods, vote, id_user) ";
      text2 += "SELECT moods.id, cast('like' AS vote_mood), CAST($1 AS BIGINT) AS id_user ";
      text2 += "FROM moods JOIN leyenda_mood ON moods.id_leyenda_mood = leyenda_mood.id ";
      text2 += "WHERE moods.moosics_id = $2 AND leyenda_mood.name ILIKE $3 ";
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
      var text1 = "INSERT INTO moods (id_leyenda_mood, moosics_id) ";
      text1 += "SELECT id, cast($1 AS INTEGER) FROM ";
      text1 += "leyenda_mood WHERE name ILIKE $2 ";
      text1 += "ON CONFLICT (id_leyenda_mood, moosics_id) DO NOTHING ";
      text1 += "RETURNING true";
      var values1 = [];
      values1.push(jsonObj.id_track);
      values1.push(jsonObj.moods_zero[i]);
      var text2 = "INSERT INTO votos_moods (id_moods, vote, id_user) ";
      text2 += "SELECT moods.id, cast('zero' AS vote_mood), CAST($1 AS BIGINT) AS id_user ";
      text2 += "FROM moods JOIN leyenda_mood ON moods.id_leyenda_mood = leyenda_mood.id ";
      text2 += "WHERE moods.moosics_id = $2 AND leyenda_mood.name ILIKE $3 ";
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
exports.favooriteMoosic = async function(jsonObj) {
  try {
    let text = "";
    text += "INSERT INTO playlist_moosics (playlist_id, moosics_id) ";
    text += "SELECT playlist.id, CAST($2 AS INTEGER) ";
    text += "FROM playlist WHERE playlist.users_id = $1 ";
    text += "RETURNING true";
    let values = [];
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
exports.unfavooriteMoosic = async function(jsonObj) {
  try {
    let text = "";
    text += "DELETE FROM playlist_moosics ";
    text += "WHERE playlist_id = (SELECT playlist.id FROM playlist WHERE users_id = $1) ";
    text += "AND moosics_id = $2 ";
    text += "RETURNING *";
    let values = [];
    values.push(jsonObj.id_user);
    values.push(jsonObj.id_track);
    console.log("::::: UNFAVOORITE MOOSIC");
    console.log(text);
    console.log(values);
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

exports.userFavoorites = async function(jsonObj) {
  try {
    var text = "";
    text += "SELECT array_to_json(array_agg(moosics)) FROM moosics ";
    text += "JOIN playlist_moosics ON moosics.id = playlist_moosics.moosics_id ";
    text += "JOIN playlist ON playlist.id = playlist_moosics.playlist_id ";
    text += "WHERE playlist.users_id = $1";
    const res = await con.pgClient.query(text, [jsonObj.id_user]);
    return res.rows[0].array_to_json;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};
