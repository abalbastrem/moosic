const GLOBALS = require('./setup_globals');
const jamendo = require('./jamendo_methods');
const con = require('./connection');
// console.log(con);

exports.testdb = async function () {
    try {
        await con.pgtest();
        var resultJson = await con.pgClient.query('SELECT row_to_json(tracks) FROM tracks LIMIT 3');
        // console.log("::::: JSON IN METHOD: " + JSON.stringify(resultJson.rows[0].row_to_json, null, 2));
        return resultJson;
    } catch (e) {
        console.error("ERROR: " + e);
    }
};

/// FIRST DUMP EVER ///
exports.firstDump = async function () {
    console.log("::::: FIRST DUMP");
    await initTables();
    try {
        const jsonArray = await apiAllTags();
        // console.log(JSON.stringify(jsonArray, null, 2));
        console.log("::::: TOTAL TRACK ARRAY COUNT: " + jsonArray.length + " new tracks");
        for (let jsonTrack of jsonArray) {
            // console.log("::::: query TRACK");
            let SQLtrack = jsonTrack2sql(jsonTrack);
            // console.log("::::: query TAGS");
            let SQLtags = jsonTags2sql(jsonTrack);
            console.log("::::: TRACK SQL");
            console.log(SQLtrack);
            console.log("::::: TRACK SQL");
            console.log(SQLtags);
            await insertTrack(SQLtrack);
            await insertTags(SQLtags);
          throw new Error("DIE");
        }
    } catch (e) {
        console.log("::::: ERROR DURING FIRST DUMP: " + e);
    }
};

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
            let SQLtrack = jsonTrack2sql(jsonTrack);
            // console.log("::::: query TAGS");
            let SQLtags = jsonTags2sql(jsonTrack);
            await insertTrack(SQLtrack);
            await insertTags(SQLtags);
        }
    } catch (e) {
        console.log("::::: ERROR DURING WEEKLY DUMP: " + e);
    }
};

async function initTables() {
    const moosics = "CREATE TABLE moosics (id int, name varchar(255), duration int, releasedate char(10), artist_id int, artist_name varchar(255), album_image varchar(255), audio varchar(255), audiodownload varchar(255), image varchar(255), album_name varchar(255), shorturl varchar(127))";
    const tags = "CREATE TABLE tags (id_moosic int, id_taginfo int)";
    const taginfo = "CREATE TABLE taginfo (id int, name varchar(127))";
    const moosics_pk = "ALTER TABLE moosics ADD PRIMARY KEY (id)";
    const tags_pk = "ALTER TABLE tags ADD CONSTRAINT PK_tags PRIMARY KEY (id_moosic, id_taginfo)";
    const taginfo_pk = "ALTER TABLE taginfo ADD PRIMARY KEY (id)";
    const tags_fk1 = "ALTER TABLE tags ADD FOREIGN KEY (id_moosic) REFERENCES moosics(id)";
    const tags_fk2 = "ALTER TABLE tags ADD FOREIGN KEY (id_taginfo) REFERENCES taginfo(id)";

    try {
        await con.pgClient.query(moosics);
        await con.pgClient.query(tags);
        await con.pgClient.query(taginfo);
        await con.pgClient.query(moosics_pk);
        await con.pgClient.query(tags_pk);
        await con.pgClient.query(taginfo_pk);
        await con.pgClient.query(tags_fk1);
        await con.pgClient.query(tags_fk2);
        console.log("::::: TABLES INITIALISED");
    } catch (e) {
        console.error("::::: ERROR while creating tables: " + e);
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
        }
        ;
        return tracksArray;
    } catch (e) {
        console.error("ERROR: " + e);
    }
};

function jsonTrack2sql(jsonTrack) {
    var params = [jsonTrack.id, jsonTrack.name, jsonTrack.duration, jsonTrack.releasedate, jsonTrack.artist_id, jsonTrack.artist_name, jsonTrack.album_image, jsonTrack.audio, jsonTrack.audiodownload, jsonTrack.image, jsonTrack.album_name, jsonTrack.shorturl];
    var text = "INSERT INTO moosics (id, name, duration, releasedate, artist_id, artist_name, album_image, audio, audiodownload, image, album_name, shorturl) VALUES (";
    text += "$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ";
    text += "ON CONFLICT (id) DO NOTHING";
    var query = {
        text: text,
        values: params
    };
    return query;
};

function jsonTags2sql(jsonTrack) {
    var queryArray = [];
    var id_track = jsonTrack.id;
    for (let genre of jsonTrack.musicinfo.tags.genres) {
        var params = [id_track, genre];
        // console.log(":::: genre: " + genre);
        var subtext = "(SELECT id FROM taginfo WHERE name ILIKE $2)";
        var text = "INSERT INTO tags (id_moosic, id_taginfo) VALUES ($1, " + subtext + ") ON CONFLICT (id_moosic, id_taginfo) DO NOTHING";
        var query = {
            text: text,
            values: params
        };
        queryArray.push(query);
    }
    return queryArray;
};

async function insertTrack(SQLtrack) {
    console.log("::::: inserting track into database");
    try {
        await con.pgClient.query(SQLtrack);
        // console.log("::::: track inserted");
    } catch (e) {
        console.error("::::: ERROR while inserting track: " + e);
    }
};

async function insertTags(SQLtags) {
    console.log("::::: inserting array of tags into database");
    try {
        for (let SQLquery of SQLtags) {
            await con.pgClient.query(SQLquery);
            // console.log("::::: tag inserted");
        }
    } catch (e) {
        console.error("::::: ERROR while inserting tag: " + e);
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
