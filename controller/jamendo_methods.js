const requestify = require('requestify');
const GLOBALS = require('./setup_globals');

console.log("::::: KEY: " + GLOBALS.KEY);

exports.api = async function(url) {
    try {
        var response = await requestify.get(url);
        var ret = response.body;
        var json = JSON.parse(ret);
        return json.results;
    } catch (e) {
        console.error("ERROR: " + e);
    }
};

exports.urlBuilder = function(tag) {
    var url = "https://api.jamendo.com/v3.0/tracks/?client_id=" + GLOBALS.KEY + "&order=relevance&include=musicinfo&audioformat=ogg&tags=" + tag + "&limit=100";
    return url;
};

exports.urlBuilderForWeeklyDump = function(tag, from, to) {
    // console.log("::::: FROM: " + from);
    // console.log("::::: TO: " + to);
    var url = "https://api.jamendo.com/v3.0/tracks/?client_id=" + GLOBALS.KEY + "&order=relevance&include=musicinfo&audioformat=ogg&tags=" + tag + "&datebetween=" + from + "_" + to + "&limit=10";
    return url;
};
