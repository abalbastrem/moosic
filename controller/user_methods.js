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

exports.beforeVote = async function() {
  // TODO
  return jsonRet;
};

exports.vote = async function() {
  // TODO
};

exports.moods = async function() {
  // TODO
};

exports.track2playlist = async function() {
  // TODO
};

exports.userplaylist = async function() {
  // TODO
};
