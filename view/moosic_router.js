var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  // logger.log(request, response);
  response.sendFile(__dirname + '/moosic-v2.html');
});

module.exports = router;
