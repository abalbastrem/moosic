const GLOBALS = require('./setup_globals');
const jamendo = require('./jamendo_methods');
const con = require('./connection');
const fs = require('fs');
const path = require('path');

exports.testdb = async function () {
    try {
        await con.pgtest();
        let resultJson = await con.pgClient.query('SELECT row_to_json(moosics) FROM moosics LIMIT 3');
        // console.log("::::: JSON IN METHOD: " + JSON.stringify(resultJson.rows[0].row_to_json, null, 2));
        return resultJson;
    } catch (e) {
        console.error("ERROR: " + e);
    }
};

/// FIRST DUMP EVER ///
exports.firstDump = async function () {
    console.log("::::: FIRST DUMP");

    try {
        await con.pgClient.end();
    } catch (e) {
        throw new Error("::::: ERROR closing connection to `moosic` db ->" + e);
    }
    console.log("::::: standard connection closed");

    const pgTemplate1 = await con.getPgClientTemplate1();

    try {
        await createMoosicDatabase(pgTemplate1);
        console.log("::::: Created `moosic` db");
    } catch (e) {
        throw new Error("::::: ERROR while creating `moosic` db -> " + e);
    }

    await pgTemplate1.end();
    console.log("::::: connection to db `template1` successfully closed");

    const pgMoosic = await con.getPgClientMoosic();
    console.log("::::: using connection to db `moosic` to perform dump");

    try {
        await createTables(pgMoosic);
        console.log("::::: TABLES INITIALISED");
    } catch (e) {
        throw new Error("::::: ERROR while creating tables -> " + e);
    }

    try {
        await initTaginfo(pgMoosic);
        console.log("::::: TAG INFO INSERTED");
    } catch (e) {
        throw new Error("::::: ERROR while filling up table `taginfo` -> " + e);
    }

    try {
        await populateMainTables(pgMoosic);
        console.log("::::: TABLES POPULATED FROM API INFO");
    } catch (e) {
        throw new Error("::::: ERROR while populating tables -> " + e);
    }

    try {
        await populateSecondaryTables(pgMoosic);
        console.log("::::: TABLES DUMPED");
    } catch (e) {
        throw new Error("::::: ERROR while dumping tables -> " + e);
    }

    try {
        await createViews(pgMoosic);
        console.log("::::: VIEWS CREATED");
    } catch (e) {
        throw new Error("::::: ERROR while creating new views -> " + e);
    }

    console.log("::::: FIRST DUMP SUCCESSFULLY FINISHED");

    // try {
    //     await con.pgClient.connect();
    //     console.log("::::: standard connection successfully opened after first dump");
    // } catch (e) {
    //     throw new Error("::::: ERROR while connecting to `moosic` after first dump ->" + e);
    // }

};

async function createMoosicDatabase(pgTemplate1) {
    await pgTemplate1.query("DROP DATABASE IF EXISTS moosic");
    await pgTemplate1.query("CREATE DATABASE moosic");
}

async function createTables(pgMoosic) {
    let sqlLines = fs.readFileSync(path.join(__dirname, "/../model/v1/moosic.sql")).toString('utf8').split(";");

    for (let i = 0; i < sqlLines.length; i++) {
        let sqlLine = sqlLines[i];
        try {
            await pgMoosic.query(sqlLine);
        } catch (e) {
            console.log("::::: ERROR with query '" + sqlLine + "' ->" + e);
        }

    }
}

async function populateMainTables(pgMoosic) {
    try {
        const jsonArray = await apiAllTags();
        // console.log(JSON.stringify(jsonArray, null, 2));
        console.log(`::::: TOTAL TRACK ARRAY COUNT: ${jsonArray.length} new tracks`);
        for (let jsonTrack of jsonArray) {
            await insertMoosic(pgMoosic, jsonTrack);
            // await insertTrack(pgMoosic, SQLtrack);
            await insertTags(pgMoosic, jsonTrack);
            // await insertTags(pgMoosic, SQLtags);
        }
    } catch (e) {
        throw new Error(e);
    }
}

async function populateSecondaryTables(pgMoosic) {
    let sqlFiles = [
            "/../model/v1/insert_users",
            "/../model/v1/insert_mood",
            "/../model/v1/insert_mood_votes",
            "/../model/v1/insert_tagvotes"
        ]

    for (let j = 0; j < sqlFiles.length; j++) {
        let sqlLines = fs.readFileSync(path.join(__dirname, sqlFiles[j])).toString('utf8').split(";");

        for (let i = 0; i < sqlLines.length; i++) {
            let sqlLine = sqlLines[i];
            try {
                await pgMoosic.query(sqlLine);
            } catch (e) {
                console.log("::::: ERROR with query '" + sqlLine + "' ->" + e);
            }
        }
    }
}

async function apiAllTags() {
    var tracksArray = [];
    var json = {};
    try {
        for (let tag of GLOBALS.TAGS) {
            if (tag != "") {
                console.log("::::: tag: " + tag);
                var url = jamendo.urlBuilder(tag);
                json = await jamendo.api(url);
                for (let jsonTrack of json) {
                    tracksArray.push(jsonTrack);
                    // console.log("::::: acc json obj length: " + tracksArray.length);
                }
            }
        }
        return tracksArray;
    } catch (e) {
        console.error("ERROR: " + e);
    }
}

/// WEEKLY DUMPS ///
exports.weeklyDump = async function (from, to) {
    // TODO refactor
    try {
        const jsonArray = await apiAllTagsForWeeklyDump(from, to);
        // console.log(JSON.stringify(jsonArray, null, 2));
        console.log("::::: TOTAL TRACK ARRAY COUNT: " + jsonArray.length + " new tracks");
        for (let jsonTrack of jsonArray) {
            // console.log("::::: query TRACK");
            let SQLtrack = insertMoosic(jsonTrack);
            // console.log(SQLtrack);
            // console.log("::::: query TAGS");
            let SQLtags = insertTags(jsonTrack);
            await insertTrack(pgMoosic, SQLtrack);
            await insertTags(pgMoosic, SQLtags);
        }
    } catch (e) {
        console.log("::::: ERROR DURING WEEKLY DUMP: " + e);
    }
};

async function initTaginfo(pgMoosic) {
    // TODO v2 dump tags into taginfo from jamendo
    for (let tag of GLOBALS.TAGS) {
        let query = {
            text: "INSERT INTO taginfo (name) VALUES($1)",
            values: [tag]
        };
        try {
            await pgMoosic.query(query);
        } catch (e) {
            throw new Error("::::: while init tag `" + tag + "` (QUERY: `" + query + "`). ->" + e);
        }
    }
}

async function createViews(pgMoosic) {
    let sqlLines = fs.readFileSync(path.join(__dirname, "/../model/v1/create_views.sql")).toString('utf8').split(";");

    for (let i = 0; i < sqlLines.length; i++) {
        let sqlLine = sqlLines[i];
        try {
            await pgMoosic.query(sqlLine);
        } catch (e) {
            console.log("::::: ERROR with query '" + sqlLine + "' ->" + e);
        }
    }
}

// Auxiliary functions
async function apiAllTagsForWeeklyDump(from, to) {
    let tracksArray = [];
    let json = {};
    try {
        for (let tag of GLOBALS.TAGS) {
            if (tag != "") {
                console.log("::::: tag: " + tag);
                var url = jamendo.urlBuilderForWeeklyDump(tag, from, to);
                json = await jamendo.api(url);
                for (let jsonTrack of json) {
                    tracksArray.push(jsonTrack);
                    // console.log("::::: acc json obj length: " + tracksArray.length);
                }
            }
        }
        return tracksArray;
    } catch (e) {
        console.error("ERROR: " + e);
    }
}

async function insertMoosic(pgMoosic, jsonTrack) {
    let params = [jsonTrack.id, jsonTrack.name, jsonTrack.duration, jsonTrack.releasedate, jsonTrack.artist_id, jsonTrack.artist_name, jsonTrack.album_image, jsonTrack.audio, jsonTrack.audiodownload, jsonTrack.image, jsonTrack.album_name, jsonTrack.shorturl];
    let text = "INSERT INTO moosics (id, name, duration, releasedate, artist_id, artist_name, album_image, audio, audiodownload, image, album_name, shorturl) VALUES (";
    text += "$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ";
    text += "ON CONFLICT (id) DO NOTHING";
    let insertMoosicQuery = {
        text: text,
        values: params
    };
    try {
        await pgMoosic.query(insertMoosicQuery);
    } catch (e) {
        throw new Error("::::: ERROR while creating moosic -> " + e);
    }
}

async function insertTags(pgMoosic, jsonTrack) {
    // let queryArray = [];
    let id_track = jsonTrack.id;
    for (let genre of jsonTrack.musicinfo.tags.genres) {
        // creates taginfo if it does not exist in the DB
        let doesTagExistQuery = {
            text: "SELECT id FROM taginfo WHERE name ILIKE $1",
            values: [genre]
        };
        let idTagRes;
        try {
            idTagRes = await pgMoosic.query(doesTagExistQuery);
        } catch (e) {
            throw new Error(`::::: ERROR while checking tag ${genre} exists in DB -> ` + e);
        }

        if (idTagRes.rowCount < 1) {
            let insertNewTagQuery = {
                text: "INSERT INTO taginfo (name) VALUES ($1)",
                values: [genre]
            };
            try {
                await pgMoosic.query(insertNewTagQuery);
            } catch (e) {
                throw new Error(`::::: ERROR while creating new tag ${genre} in DB -> ` + e);
            }
        }
        // inserts moosic's tag
        let params = [id_track, genre];
        let subtext = `(SELECT id FROM taginfo WHERE name ILIKE $2)`;
        let text = `INSERT INTO tags (moosics_id, taginfo_id) VALUES ($1, ${subtext}) `;
        text += `ON CONFLICT (moosics_id, taginfo_id) DO NOTHING`;
        let insertTagsQuery = {
            text: text,
            values: params
        };
        try {
            await pgMoosic.query(insertTagsQuery);
        } catch (e) {
            throw new Error(`::::: ERROR while inserting moosic's ${id_track} tags -> ` + e);
        }
    }
}


/// DB FUNCTIONS ///

exports.demo = async function () {
    try {
        await con.pgClient.query('SELECT demo(3)');
        // console.log("::::: RESULT FROM DEMO: " + JSON.stringify(res.rows[0].demo));
    } catch (e) {
        console.error("ERROR WHILE DEMO: " + e);
    }
};

exports.updateViews = async function () {
    try {
        const res = await con.pgClient.query('SELECT creaviews()');
        console.log("::::: RESULT FROM VIEWS: " + res);
    } catch (e) {
        console.error("ERROR WHILE UPDATING VIEWS: " + e);
    }
};
