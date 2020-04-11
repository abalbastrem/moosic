SELECT 1000 AS number;

-- tables
-- Table: genre
--     CREATE TABLE genre (
--          id serial,
--          name varchar(30)  NOT NULL,
--          CONSTRAINT genre_pk PRIMARY KEY (id)
--      );

-- Table: leyenda_mood
CREATE TABLE moodinfo (
    id serial,
    name varchar(40)  NOT NULL,
    CONSTRAINT moodinfo_pk PRIMARY KEY (id)
);

-- Table: leyenda_tags
CREATE TABLE taginfo (
    id serial,
    name varchar(30)  NOT NULL,
    CONSTRAINT taginfo_pk PRIMARY KEY (id)
);

-- Table: moods
CREATE TABLE moods (
    id serial,
    moodinfo_id bigint  NOT NULL,
    moosics_id bigint  NOT NULL,
    CONSTRAINT moods_ak_unique_FK_mood_votes_id_moods UNIQUE (id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT moods_pk PRIMARY KEY (moodinfo_id,moosics_id)
);

-- Table: playlist
CREATE TABLE playlist (
    id serial,
    title varchar(20)  NOT NULL,
    users_id bigint  NOT NULL,
    CONSTRAINT playlist_pk PRIMARY KEY (id)
);

-- Table: playlist_songs
CREATE TABLE playlist_moosics (
    playlist_id bigint  NOT NULL,
    moosics_id bigint  NOT NULL,
    CONSTRAINT playlist_songs_pk PRIMARY KEY (playlist_id, moosics_id)
);

-- Table: tags
CREATE TABLE tags (
    id serial,
    moosics_id bigint  NOT NULL,
    taginfo_id bigint  NOT NULL,
    CONSTRAINT id UNIQUE (id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT tags_pk PRIMARY KEY (moosics_id, taginfo_id)
);

-- Table: tracks
CREATE TABLE moosics (
    id bigint  NOT NULL,
    name text  NOT NULL,
    duration bigint NOT NULL,
    releasedate date NOT NULL,
    dumpdate date NOT NULL default now(),
    plays bigint NOT NULL default 0,
    artist_id bigint  NOT NULL,
    artist_name text  NOT NULL,
    album_image text  NOT NULL,
    audio text  NOT NULL,
    audiodownload text  NOT NULL,
    image text  NOT NULL,
    album_name text  NOT NULL,
    shortUrl text  NOT NULL,
    CONSTRAINT moosics_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE users (
    id serial,
    name varchar(24)  NOT NULL,
    lastname varchar(32)  NOT NULL,
    username varchar(40)  NOT NULL,
    password varchar(40)  NOT NULL,
    email varchar(60)  NOT NULL,
    sex char(1)  NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- Table: votos_moods
CREATE TYPE vote_tag AS ENUM ('like', 'dislike', 'zero');
-- TYPE : like, dislike or zero
CREATE TYPE vote_mood AS ENUM ('like', 'zero');
-- TYPE : like or zero


CREATE TABLE mood_votes (
    moods_id bigint  NOT NULL,
    vote vote_mood  NOT NULL,
    vote_date timestamp  NOT NULL default now(),
    users_id bigint  NOT NULL,
    CONSTRAINT mood_votes_pk PRIMARY KEY (moods_id, users_id)
);

-- Table: votos_tag
CREATE TABLE tag_votes (
    tags_id bigint  NOT NULL,
    vote vote_tag  NOT NULL,
    vote_date timestamp  NOT NULL,
    users_id bigint  NOT NULL,
    CONSTRAINT votos_tag_pk PRIMARY KEY (tags_id, users_id)
);

-- foreign keys
-- Reference: leyenda_tags_genre (table: leyenda_tags)
-- ALTER TABLE taginfo ADD CONSTRAINT taginfo_genre
-- FOREIGN KEY (genre)
-- REFERENCES genre (id) ON DELETE CASCADE
-- NOT DEFERRABLE
-- INITIALLY IMMEDIATE
-- ;

--- CONSTRAINTS ---

ALTER TABLE users ADD UNIQUE (username);

-- Reference: moods_leyenda_mood (table: moods)
ALTER TABLE moods ADD CONSTRAINT moods_moodinfo
FOREIGN KEY (moodinfo_id)
REFERENCES moodinfo (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;

-- Reference: moods_tracks (table: moods)
ALTER TABLE moods ADD CONSTRAINT moods_moosics
FOREIGN KEY (moosics_id)
REFERENCES moosics (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;

-- Reference: playlist_songs_playlist (table: playlist_songs)
ALTER TABLE playlist_moosics ADD CONSTRAINT playlist_moosics_playlist
FOREIGN KEY (playlist_id)
REFERENCES playlist (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;
ALTER TABLE playlist_moosics ADD CONSTRAINT playlist_moosics_moosics
FOREIGN KEY (moosics_id)
REFERENCES moosics (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;
-- Reference: playlist_songs_tracks (table: playlist_songs)
-- ALTER TABLE playlist_songs ADD CONSTRAINT playlist_songs_tracks
-- FOREIGN KEY (tracks_id)
-- REFERENCES tracks (id) ON DELETE CASCADE
-- NOT DEFERRABLE
-- INITIALLY IMMEDIATE
-- ;

-- Reference: playlist_users (table: playlist)
ALTER TABLE playlist ADD CONSTRAINT playlist_users
FOREIGN KEY (users_id)
REFERENCES users (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;

-- Reference: tags_leyenda_tags (table: tags)
ALTER TABLE tags ADD CONSTRAINT tags_taginfo
FOREIGN KEY (taginfo_id)
REFERENCES taginfo (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;

-- Reference: tags_tracks (table: tags)
ALTER TABLE tags ADD CONSTRAINT tags_moosics
FOREIGN KEY (moosics_id)
REFERENCES moosics (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;

-- Reference: votos_moods_moods (table: votos_moods)
ALTER TABLE mood_votes ADD CONSTRAINT mood_votes_moods
FOREIGN KEY (moods_id)
REFERENCES moods (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;

-- Reference: votos_moods_users (table: votos_moods)
ALTER TABLE mood_votes ADD CONSTRAINT mood_votes_users
FOREIGN KEY (users_id)
REFERENCES users (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;

-- Reference: votos_tag_tags (table: votos_tag)
ALTER TABLE tag_votes ADD CONSTRAINT tag_votes_tags
FOREIGN KEY (tags_id)
REFERENCES tags (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;

-- Reference: votos_tag_users (table: votos_tag)
ALTER TABLE tag_votes ADD CONSTRAINT tag_votes_users
FOREIGN KEY (users_id)
REFERENCES users (id) ON DELETE CASCADE
NOT DEFERRABLE
INITIALLY IMMEDIATE
;
ALTER TABLE tag_votes ALTER COLUMN vote_date SET DEFAULT now();

-- End of file.



-- QUITAMOS EL NOT NULL A ALGUNOS CAMPOS DE LA TABLA USERS
-- ALTER TABLE users ALTER COLUMN sex DROP NOT NULL;
-- ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
-- ALTER TABLE users ALTER COLUMN lastname DROP NOT NULL;

-- VIEWS
-- \i insert_users.sql
-- \i insert_mood_votes.sql
-- \i insert_tagvotes.sql
-- \i views/baby_tracks.sql
-- \i views/moods_general.sql
-- \i views/top_tags.sql



--insert into tracks (id, name, duration, releasedate, dumpdate, artist_id, artist_name, album_image, audio, audiodownload, image, album_name, shorturl) values(1501986, 'Empty Streets',249, '2017-12-05', '2018-04-25', 505236, 'Omonoko', 'https://imgjam1.jamendo.com/albums/s172/172995/covers/1.200.jpg', 'https://mp3l.jamendo.com/?trackid=1501986&format=mp31&from=app-e106f235', 'https://mp3d.jamendo.com/download/track/1501986/mp32/', 'https://imgjam1.jamendo.com/albums/s172/172995/covers/1.200.jpg', 'Strong', 'http://jamen.do/t/1161940');
--insert into leyenda_mood (name) values ('happy');
--insert into leyenda_mood (name) values ('sad');
--insert into leyenda_mood (name) values ('angry');
--insert into leyenda_mood (name) values ('energetic');
--insert into moods (id_leyenda_mood, id_track) values ( 2, 1501986);
--insert into moods (id_leyenda_mood, id_track) values (4,  1501986);
--insert into votos_moods values(1, 'like', now(), 2);

-- insert into playlist (title, users_id) values ('my playlist', 2);
-- insert into playlist (title, users_id) values ('trapeo', 3);

-- insert into playlist_songs values(1, 1501986);

--insert into tags (id_track, id_leyenda_tag) values (1501986, 3);
--insert into votos_tag values(1, 'like', now(), 3); --eliminar segunda columna
--insert into votos_tag values(1, 'dislike', now(), 2); --eliminar segunda columna
--insert into votos_tag values(1, 'zero', now(), 1); --eliminar segunda columna

-- el usuario con id = 2 cambia de opinion y opina que le gusta el tag propuesto 1
--insert into votos_tag values(1, 'like', now(), 2) ON CONFLICT (id_tags, id_users) DO UPDATE SET vote = excluded.vote;


insert into moodinfo (name) VALUES ('Happy');
insert into moodinfo (name) VALUES ('Energetic');
insert into moodinfo (name) VALUES ('Frantic');
insert into moodinfo (name) VALUES ('Anxious');
insert into moodinfo (name) VALUES ('Melancholic');
insert into moodinfo (name) VALUES ('Depressive');
insert into moodinfo (name) VALUES ('Calm');

-- damos grant a albert(admin server) para hacer insert select delete y update a las tablas
-- grant SELECT ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag to admin_moosic;
--     grant INSERT ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag to admin_moosic;
--         grant DELETE ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag to admin_moosic;
--             grant UPDATE ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag to admin_moosic;



-- para las views tambien

-- grant SELECT ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag, moods_general, baby_tracks to admin_moosic;
-- grant INSERT ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag, moods_general, baby_tracks to admin_moosic;
-- grant DELETE ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag, moods_general, baby_tracks to admin_moosic;
-- grant UPDATE ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag, moods_general, baby_tracks to admin_moosic;



-- damos permiso al uso y consulta de las secuencias para que se autogenere el id en las tablas
-- GRANT USAGE, SELECT ON SEQUENCE genre_id_seq, leyenda_mood_id_seq,moods_id_seq,users_id_seq,leyenda_tags_id_seq,playlist_id_seq,tags_id_seq to admin_moosic;

-- En la siguiente query, consultaremos las canciones de la playlist de name 'my playlist' para obtener las canciones.
--select users_id, title, name, audio from playlist pl join playlist_songs ps on pl.id = ps.playlist_id join tracks tr on ps.tracks_id = tr.id where pl.title = 'my playlist'; 

-- obtener las canciones que esten tageadas como pop y rock
-- SELECT tracks.id, tracks.name FROM tracks JOIN tags ON tracks.id=tags.id_track JOIN leyenda_tags ON tags.id_leyenda_tag=leyenda_tags.id WHERE tags.id_leyenda_tag IN (select leyenda_tags.genre from leyenda_tags where name ilike 'pop' OR name ilike 'rock' ) LIMIT 3;





--CREATE OR REPLACE FUNCTION creaViews() RETURNS void as $$
--BEGIN
--\i create_views.sql
--RAISE NOTICE 'Se han creado las VIEWS correctamente';
--END;
--$$LANGUAGE plpgsql;
