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

async function createTablesOLD() {
    await con.pgClient.query("DROP TABLE IF EXISTS moosics CASCADE");
    await con.pgClient.query("DROP TABLE IF EXISTS taginfo CASCADE");
    await con.pgClient.query("DROP TABLE IF EXISTS tags CASCADE");

    const moosics = "CREATE TABLE moosics (id int PRIMARY KEY, name varchar(255), duration int, releasedate char(10), artist_id int, artist_name varchar(255), album_image varchar(255), audio varchar(255), audiodownload varchar(255), image varchar(255), album_name varchar(255), shorturl varchar(127))";
    const tags = "CREATE TABLE tags (id_moosic int, id_taginfo int)";
    const taginfo = "CREATE TABLE taginfo (id SERIAL PRIMARY KEY, name VARCHAR(127) UNIQUE)";
    const tags_pk = "ALTER TABLE tags ADD CONSTRAINT PK_tags PRIMARY KEY (id_moosic, id_taginfo)";
    const tags_fk1 = "ALTER TABLE tags ADD FOREIGN KEY (id_moosic) REFERENCES moosics(id)";
    const tags_fk2 = "ALTER TABLE tags ADD FOREIGN KEY (id_taginfo) REFERENCES taginfo(id)";

    await con.pgClient.query(moosics);
    await con.pgClient.query(tags);
    await con.pgClient.query(taginfo);
    await con.pgClient.query(tags_pk);
    await con.pgClient.query(tags_fk1);
    await con.pgClient.query(tags_fk2);
}

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
    let sqlFile1 = "../model/v1/insert_users";
    let sqlFile2 = "../model/v1/insert_mood";
    let sqlFile3 = "../model/v1/insert_mood_votes";
    let sqlFile4 = "../model/v1/insert_tagvotes";
}

async function apiAllTags() {
    var n = 0;
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
        ;
        return tracksArray;
    } catch (e) {
        console.error("ERROR: " + e);
    }
};

/// WEEKLY DUMPS ///
exports.weeklyDump = async function (from, to) {
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

async function createViewsOLD() {
    let createTopTags = {
        text: "CREATE VIEW toptags AS select row_number() OVER (order by count(*) DESC) as position, id_taginfo, taginfo.name, count(*) as popularity from tags join taginfo on id_taginfo = taginfo.id group by id_taginfo, taginfo.name order by popularity DESC"
    };
    try {
        await con.pgClient.query(createTopTags);
    } catch (e) {
        throw new Error("while creating `toptags` -> " + e);
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
    var n = 0;
    var tracksArray = [];
    var json = {};
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
        };
        return tracksArray;
    } catch (e) {
        console.error("ERROR: " + e);
    }
};

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

async function insertTrackOLD(pgMoosic, SQLtrack) {
    console.log("::::: inserting track into database");
    try {
        await pgMoosic.query(SQLtrack);
        // console.log("::::: track inserted");
    } catch (e) {
        throw new Error("::::: ERROR while inserting track -> " + e);
    }
};

async function insertTagsOLD(pgMoosic, SQLtags) {
    console.log("::::: inserting array of tags into database");
    try {
        for (let SQLquery of SQLtags) {
            await pgMoosic.query(SQLquery);
            // console.log("::::: tag inserted");
        }
    } catch (e) {
        throw new Error("::::: ERROR while inserting tag -> " + e);
    }
};


/// DB FUNCTIONS ///

exports.demo = async function () {
    try {
        const res = await con.pgClient.query('SELECT demo(3)');
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
