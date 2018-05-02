/// PROJECT GLOBALS SETUP ///
const GLOBALS = require('./setup');
const db = require('./dump_methods');
const jamendo = require('./jamendo_methods');
const user = require('./user_methods');
console.log("::::: PROJECT GLOBALS SET UP SUCCESSFULLY :::::");

/// SERVER CONFIG ///
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const bcrypt = require('bcryptjs');
const requestify = require('requestify');
const SQLBuilder = require('json-sql-builder2');
const pg = require('pg');
const pgquery = require('pg-query');
server.listen(8888);
console.log("::::: SERVER ONLINE :::::");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
console.log("::::: POST HANDLING ENABLED ::::::\n");

/// CONNECTION TO DATABASE ///
const con = require('./connection');
// con.pgClient.connect();

/// TEST HANDLERS ///
app.get('/', function(request, response) {
  log(request, response);
  response.write('hello world');
  response.end();
});

app.post('/test', function(request, response) {
  log(request, response);
  response.writeHead('200');
  response.write('hello world');
  response.write('this is a test with post');
  response.end();
});

app.get('/testdb', async function(request, response) {
  log(request, response);
  try {
    const res = await db.testdb();
    console.log("::::: in handler RESPONSE:\n" + JSON.stringify(res, null, 2));
    response.writeHead(200, {
      'Content-type': 'text/html'
    });
    response.write(JSON.stringify(ret, null, 2));
    response.end();
  } catch (e) {
    // response.writeHead(500);
    response.end();
    console.error("ERROR: " + e);
  }
});

/// USER ///
app.post('/signup', async function(request, response) {
  log(request, response);
  try {
    var jsonObj = request.body.json;
    if (await user.userExists(jsonObj)) {
      response.send({
        "status": true,
        "message": "user already exists"
      });
    } else {
      await user.signUp(jsonObj);
      response.send({
        "status": true,
        "message": "user registered. Please log in"
      });
    }
  } catch (e) {
    response.send({
      "status": false
    });
    console.error("ERROR: " + e);
  }
});

app.post('/login', async function(request, response) {
  log(request, response);
  try {
    var jsonObj = request.body.json;
    const res = await user.logIn(jsonObj);
    if (res[0] == null) {
      response.send({
        "status": true,
        "message": "this user does not exist. Please register"
      });
    } else {
      response.send({
        "status": true,
        "data": res
      });
    }
  } catch (e) {
    response.send({
      "status": false
    });
    console.error("ERROR: " + e);
  }
});

app.post('/get', async function(request, response) {
  log(request, response);
  try {
    var tagArray = request.body.json.tags;
    const res = await user.get(tagArray);
    console.log("::::: in handler RESPONSE:\n" + res[0]);
    // response.write(res);
    response.send({
      "status": true,
      "data": res
    });
  } catch (e) {
    response.send({
      "status": false,
      "data": res
    });
    console.error("ERROR: " + e);
  }
});

// Asks the server whether it should show a voting prompt to the user
app.post('/beforevote', async function(request, response) {
  log(request, response);
  try {
    var jsonObj = request.body.json;
    const res = await user.beforeVote(jsonObj); // boolean
    response.send({
      "status": true,
      "data": res
    });
  } catch (e) {
    response.send({
      "status": false
    });
    console.error("ERROR: " + e);
  }
});

app.post('/vote', async function(request, response) {
  log(request, response);
  try {
    var jsonObj = request.body.json;
    await user.vote(jsonObj);
    response.send({
      "status": true
    });
  } catch (e) {
    response.send({
      "status": false
    });
    console.error("ERROR: " + e);
  }
});

app.post('/beforemoods', async function(request, response) {
  log(request, response);
  try {
    var jsonObj = request.body.json;
    const res = user.beforeMoods(jsonObj); // boolean
    response.send({
      "status": true,
      "data": res
    });
  } catch (e) {
    response.send({
      "status": false
    });
    console.error("ERROR: " + e);
  }
});

app.post('/moods', async function(request, response) {
  log(request, response);
  try {
    var jsonObj = request.body.json;
    await user.moods(jsonObj);
    response.send({
      "status": true
    });
  } catch (e) {
    response.send({
      "status": false
    });
    console.error("ERROR: " + e);
  }
});

// Adds or remove a track from user playlist
app.post('/track2playlist', async function(request, response) {
  log(request, response);
  try {
    var jsonObj = request.body.json;
    await user.track2playlist(jsonObj);
    response.send({
      "status": true
    })
  } catch (e) {
    response.send({
      "status": false
    });
    console.error("ERROR: " + e);
  }
});

// Asks for a user playlist
app.post('/userplaylist', async function(request, response) {
  log(request, response);
  try {
    var jsonObj = request.body.json;
    const res = user.userplaylist(jsonObj);
    response.send({
      "status": true,
      "data": res
    })
  } catch (e) {
    response.send({
      "status": false
    });
    console.error("ERROR: " + e);
  }
});



/// THE D U M P ///
// async function apiAllTags() {
//   var n = 0;
//   var tracksArray = [];
//   var json = {};
//   try {
//     for (let tag of GLOBALS.TAGS) {
//       if (tag != "") {
//         console.log("::::: tag: " + tag);
//         var url = jamendo.urlBuilder(tag);
//         json = await jamendo.api(url);
//         for (let jsonTrack of json) {
//           tracksArray.push(jsonTrack);
//           console.log("::::: acc json obj length: " + tracksArray.length);
//         }
//       }
//     };
//     return tracksArray;
//   } catch (e) {
//     console.error("ERROR: " + e);
//   }
// };
//
// async function dump() {
//   try {
//     const jsonArray = await apiAllTags();
//     // console.log(JSON.stringify(jsonArray, null, 2));
//     console.log("::::: TOTAL TRACK ARRAY COUNT: " + jsonArray.length + " new tracks");
//     for (let jsonTrack of jsonArray) {
//       console.log("::::: query TRACK");
//       let SQLtrack = db.jsonTrack2sql(jsonTrack);
//       console.log("::::: query TAGS");
//       let SQLtags = db.jsonTags2sql(jsonTrack);
//       await db.insertTrack(SQLtrack);
//       await db.insertTags(SQLtags);
//     }
//   } catch (e) {
//     console.log("::::: ERROR: " + e);
//   }
// };

db.dump();

/// QUICK LOG ///
var n = 0;

function log(request, response) {
  console.log("::::: REQ " + ++n + "\t" + new Date().toISOString());
  console.log("::::: PATH:\t" + request.route.path);
  console.log("::::: URL:\t" + request.originalUrl);
  console.log("::::: IP:\t" + request.ip);
  console.log("::::: DATA:\t" + request.body.json);
  console.log("");
};

function logwrapper(request, response, cb) {
  console.log("REQ " + ++n + "\t" + new Date().toISOString());
  console.log("PATH:\t" + request.route.path);
  console.log("URL:\t" + request.originalUrl);
  console.log("IP:\t" + request.ip);
  console.log("");
  cb();
};
