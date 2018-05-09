/// QUICK LOGGER ///
var n = 0;

exports.log = function(request, response) {
  console.log("");
  console.log("::::: REQ " + ++n + "\t" + new Date().toISOString());
  console.log("::::: PATH:\t" + request.route.path);
  console.log("::::: URL:\t" + request.originalUrl);
  console.log("::::: IP:\t" + request.ip);
  console.log("::::: DATA:\t" + request.body.json);
  console.log("");
};
