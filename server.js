/// PROJECT GLOBALS SETUP ///
const db = require('./controller/populate_methods');
const user = require('./controller/user_methods');
const util = require('./controller/util_methods');
const logger = require('./controller/logger');
console.log("::::: PROJECT GLOBALS SET UP SUCCESSFULLY :::::");

/// SERVER CONFIG ///
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cron = require('node-cron');
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
app.use('/webfonts', express.static(path.join(__dirname, 'webfonts')));
server.listen(8888);
console.log("::::: SERVER ONLINE :::::");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
console.log("::::: POST HANDLING ENABLED ::::::\n");


/// TEST HANDLERS ///
app.get('/test', function (request, response) {
    logger.log(request, response);
    response.send({
        "status": true,
        "message": "todo bien"
    });
});

app.get('/testdb', async function (request, response) {
    logger.log(request, response);
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
app.get('/', function (request, response) {
    logger.log(request, response);
    response.sendFile(__dirname + '/view/moosic-v2.html');
});

app.post('/signup', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        // console.log("::::: IN HANDLER:\n" + JSON.stringify(jsonObj));
        if (await user.userExists(jsonObj)) {
            response.send({
                "status": false,
                "data": 1,
                "message": "user already exists"
            });
        } else {
            if (await user.signUp(jsonObj)) {
                if (await user.createFavoorites(jsonObj)) { // create playlist when user is signed up
                    response.send({
                        "status": true,
                        "message": "user registered. Please log in"
                    })
                } else {
                    response.send({
                        "status": false,
                        "data": 3,
                        "message": "user registered, but favoorites could not be created"
                    })
                }
            } else {
                response.send({
                    "status": false,
                    "data": 2,
                    "message": "user could not be registered"
                })
            }
        }
    } catch (e) {
        response.send({
            "status": false,
            "data": null,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});

app.post('/login', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        // console.log("::::: IN HANDLER:\n" + JSON.stringify(jsonObj));
        const res = await user.logIn(jsonObj);
        if (res == null) { // If no user is found
            response.send({
                "status": false,
                "message": "this user does not exist. Please register",
                "data": null
            });
        } else {
            response.send({
                "status": true,
                "data": res,
                "message": "login successful"
            });
        }
    } catch (e) {
        response.send({
            "status": false,
            "data": null,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});

app.post('/blindstart', async function (request, response) {
    logger.log(request, response);
    try {
        const res = await user.blindStart();
        // console.log("::::: " + JSON.stringify(res, null, 2));
        response.send({
            "status": "true",
            "data": res
        })
    } catch (e) {
        response.send({
            "status": false,
            "data": null,
            "message": "error"
        })
    }
});

// Gets moosics based on tags
app.post('/getmoosics', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        var tagArray = [];
        for (i in jsonObj.tags) {
            tagArray.push(jsonObj.tags[i]);
        }
        var res = await user.getMoosics(tagArray);
        if (res == null) {
            response.send({
                "status": false,
                "data": null,
                "message": "That tag has no moosics"
            });
        } else {
            var res = util.shuffleMoosics(res);
            response.send({
                "status": true,
                "data": res.slice(0, 100)
            });
        }
    } catch (e) {
        response.send({
            "status": false,
            "data": null,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});

// Gets popular tags based on input coexisting tags
app.post('/gettags', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        var tagArray = [];
        for (i in jsonObj.tags) {
            tagArray.push(jsonObj.tags[i]);
        }
        const res = await user.getTags(tagArray);
        response.send({
            "status": true,
            "data": res.slice(0, 100)
        });
    } catch (e) {
        response.send({
            "status": false,
            "data": null,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});

// Asks the server whether it should show a voting prompt to the user
app.post('/beforevote', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        // console.log("::::: HANDLER: " + JSON.stringify(jsonObj, null, 2));
        const tagArray = await user.beforeVote(jsonObj);
        console.log("::::: IN HANDLER: " + tagArray);
        if (tagArray == null) {
            response.send({
                "status": false,
                "message": "no tag in need of voting",
                "data": null
            });
        } else {
            response.send({
                "status": true,
                "data": tagArray
            });
        }
    } catch (e) {
        response.send({
            "status": false,
            "data": null,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});

app.post('/vote', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        await user.vote(jsonObj);
        response.send({
            "status": true
        });
    } catch (e) {
        response.send({
            "status": false,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});

app.post('/beforemoods', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        if (await user.hasUserVotedMoods(jsonObj)) {
            response.send({
                "status": true,
                "data": null,
                "message": "user has already voted moods for this moosic"
            })
        } else {
            const res = await user.whichMoodsToVote();
            response.send({
                "status": false,
                "data": res
            });
        }
    } catch (e) {
        response.send({
            "status": false,
            "message": "error",
            "data": null
        });
        console.error("ERROR: " + e);
    }
});

app.post('/moods', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        if (await user.moods(jsonObj)) {
            response.send({
                "status": true,
                "message": "moods voted correctly"
            });
        } else {
            response.send({
                "status": false,
                "message": "moods could not be voted"
            });
        }
    } catch (e) {
        response.send({
            "status": false,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});

// Adds or remove a track from user playlist
app.post('/favoritetrack', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        if (await user.favooriteMoosic(jsonObj)) {
            response.send({
                "status": true,
                "message": "moosic has been added"
            })
        } else {
            response.send({
                "status": false,
                "message": "moosic could not be added"
            })
        }
    } catch (e) {
        response.send({
            "status": false,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});

app.post('/unfavoritetrack', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        console.log(JSON.stringify(jsonObj, null, 2));
        if (await user.unfavooriteMoosic(jsonObj)) {
            response.send({
                "status": true,
                "message": "moosic has been removed"
            })
        } else {
            response.send({
                "status": true,
                "message": "moosic could not be removed"
            })
        }
    } catch (e) {
        response.send({
            "status": false,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});

// Asks for a user playlist
app.post('/userfavorites', async function (request, response) {
    logger.log(request, response);
    try {
        var jsonObj = JSON.parse(request.body.json);
        const res = await user.userFavoorites(jsonObj);
        response.send({
            "status": true,
            "data": res
        })
    } catch (e) {
        response.send({
            "status": false,
            "message": "error"
        });
        console.error("ERROR: " + e);
    }
});


/// DUMP ///
// weekly dump on Sundays
cron.schedule('1 0 0 * * Sunday', function () {
    console.log('*** PERFORMING WEEKLY DUMP ***');
    var currentDate = new Date();
    var lastWeekDate = new Date();
    lastWeekDate.setDate(currentDate.getDate() - 7);
    currentDate.setDate(currentDate.getDate() - 1);
    const currentDateStr = currentDate.toISOString().substring(0, 10);
    const lastWeekDateStr = lastWeekDate.toISOString().substring(0, 10);
    db.weeklyPopulate(lastWeekDateStr, currentDateStr);
    db.updateViews();
});
