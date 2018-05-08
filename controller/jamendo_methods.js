const requestify = require('requestify');

exports.api = async function(url) {
  try {
    var response = await requestify.get(url);
    var ret = response.body;
    // console.log(ret);
    var json = JSON.parse(ret);
    // console.log(url);
    // console.log("::::: JSON OBJ: " + JSON.stringify(json.results, null, 2));
    return json.results;
  } catch (e) {
    console.error("ERROR: " + e);
  }
};

exports.urlBuilder = function(tag) {
  var url = "https://api.jamendo.com/v3.0/tracks/?client_id=e106f235&order=relevance&include=musicinfo&audioformat=ogg&tags=" + tag + "&limit=100";
  return url;
};

exports.urlBuilderForWeeklyDump = function(tag, from, to) {
  console.log("::::: FROM: " + from);
  console.log("::::: TO: " + to);
  var url = "https://api.jamendo.com/v3.0/tracks/?client_id=e106f235&order=relevance&include=musicinfo&audioformat=ogg&tags=" + tag + "&datebetween=" + from + "_" + to + "&limit=10";
  return url;
};
