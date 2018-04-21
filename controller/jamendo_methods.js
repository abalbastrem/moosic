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

exports.urlBuilder = function urlBuilder(tag) {
  var url = "https://api.jamendo.com/v3.0/tracks/?client_id=e106f235&include=musicinfo&format=jsonpretty&tags=" + tag + "&limit=2";
  return url;
};

// exports.get2 = function(request, response, url, callback) {
//   console.log("::::: IN FUNCTION");
//   try {
//     requestify.get(url).then(function(resp) {
//       var ret = resp.body;
//       console.log("::::: in function RESPONSE: " + ret);
//       callback(request, response, ret);
//     });
//   } catch (e) {
//     console.error("ERROR: " + e);
//   }
// };
//
// exports.cbReturnFromApi = function returnFromApi(request, response, ret) {
//   console.log("::::: IN CALLBACK");
//   if (ret) {
//     console.log("::::: in callback RESPONSE:\n" + ret);
//     response.writeHead(200, {
//       'Content-type': 'text/html'
//     });
//     response.write("::::: " + ret);
//     response.end();
//     // return ret;
//   } else {
//     console.log("no ha devuelto resultados");
//   }
// };

// exports.urlBuilderOLD = function urlBuilder() {
//   var url = "https://api.jamendo.com/v3.0/tracks/?client_id=e106f235&format=jsonpretty&limit=1&include=musicinfo&groupby=artist_id";
//   return url;
// };
