-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2018-04-18 16:20:29.693

-- tables
-- Table: genre
\c template1;
drop database moosic_final;
create database moosic_final;
\c moosic_final;


CREATE TABLE genre (
    id serial,
    name varchar(30)  NOT NULL,
    CONSTRAINT genre_pk PRIMARY KEY (id)
);

-- Table: leyenda_mood
CREATE TABLE leyenda_mood (
    id serial,
    nombre varchar(40)  NOT NULL,
    CONSTRAINT leyenda_mood_pk PRIMARY KEY (id)
);

-- Table: leyenda_tags
CREATE TABLE leyenda_tags (
    id serial,
    nombre varchar(30)  NOT NULL,
    genre bigint  NOT NULL,
    CONSTRAINT leyenda_tags_pk PRIMARY KEY (id)
);

-- Table: moods
CREATE TABLE moods (
    id serial,
    id_leyenda_mood bigint  NOT NULL,
    id_track bigint  NOT NULL,
    CONSTRAINT moods_ak_unique_FK_votosmood_id_moods UNIQUE (id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT moods_pk PRIMARY KEY (id_leyenda_mood,id_track)
);

-- Table: playlist
CREATE TABLE playlist (
    id serial,
    title varchar(20)  NOT NULL,
    users_id bigint  NOT NULL,
    CONSTRAINT playlist_pk PRIMARY KEY (id)
);

-- Table: playlist_songs
CREATE TABLE playlist_songs (
    playlist_id bigint  NOT NULL,
    tracks_id bigint  NOT NULL
);

-- Table: tags
CREATE TABLE tags (
    id serial,
    id_track bigint  NOT NULL,
    id_leyenda_tag bigint  NOT NULL,
    CONSTRAINT id UNIQUE (id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT tags_pk PRIMARY KEY (id_track,id_leyenda_tag)
);

-- Table: tracks
CREATE TABLE tracks (
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
    CONSTRAINT tracks_pk PRIMARY KEY (id)
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
CREATE TYPE vote AS ENUM ('like', 'dislike', 'zero');
-- TYPE : like, dislike or zero
CREATE TYPE vote_mood AS ENUM ('like', 'zero');
-- TYPE : like or zero


CREATE TABLE votos_moods (
    id_moods bigint  NOT NULL,
    vote vote_mood  NOT NULL,
    fecha_votacion timestamp  NOT NULL,
    id_user bigint  NOT NULL,
    CONSTRAINT votos_moods_pk PRIMARY KEY (id_user)
);

-- Table: votos_tag
CREATE TABLE votos_tag (
    id_tags bigint  NOT NULL,
    vote vote  NOT NULL,
    fecha_votacion timestamp  NOT NULL,
    id_users bigint  NOT NULL,
    CONSTRAINT votos_tag_pk PRIMARY KEY (id_tags,id_users)
);

-- foreign keys
-- Reference: leyenda_tags_genre (table: leyenda_tags)
ALTER TABLE leyenda_tags ADD CONSTRAINT leyenda_tags_genre
    FOREIGN KEY (genre)
    REFERENCES genre (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: moods_leyenda_mood (table: moods)
ALTER TABLE moods ADD CONSTRAINT moods_leyenda_mood
    FOREIGN KEY (id_leyenda_mood)
    REFERENCES leyenda_mood (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: moods_tracks (table: moods)
ALTER TABLE moods ADD CONSTRAINT moods_tracks
    FOREIGN KEY (id_track)
    REFERENCES tracks (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: playlist_songs_playlist (table: playlist_songs)
ALTER TABLE playlist_songs ADD CONSTRAINT playlist_songs_playlist
    FOREIGN KEY (playlist_id)
    REFERENCES playlist (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: playlist_songs_tracks (table: playlist_songs)
ALTER TABLE playlist_songs ADD CONSTRAINT playlist_songs_tracks
    FOREIGN KEY (tracks_id)
    REFERENCES tracks (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: playlist_users (table: playlist)
ALTER TABLE playlist ADD CONSTRAINT playlist_users
    FOREIGN KEY (users_id)
    REFERENCES users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: tags_leyenda_tags (table: tags)
ALTER TABLE tags ADD CONSTRAINT tags_leyenda_tags
    FOREIGN KEY (id_leyenda_tag)
    REFERENCES leyenda_tags (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: tags_tracks (table: tags)
ALTER TABLE tags ADD CONSTRAINT tags_tracks
    FOREIGN KEY (id_track)
    REFERENCES tracks (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: votos_moods_moods (table: votos_moods)
ALTER TABLE votos_moods ADD CONSTRAINT votos_moods_moods
    FOREIGN KEY (id_moods)
    REFERENCES moods (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: votos_moods_users (table: votos_moods)
ALTER TABLE votos_moods ADD CONSTRAINT votos_moods_users
    FOREIGN KEY (id_user)
    REFERENCES users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: votos_tag_tags (table: votos_tag)
ALTER TABLE votos_tag ADD CONSTRAINT votos_tag_tags
    FOREIGN KEY (id_tags)
    REFERENCES tags (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: votos_tag_users (table: votos_tag)
ALTER TABLE votos_tag ADD CONSTRAINT votos_tag_users
    FOREIGN KEY (id_users)
    REFERENCES users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

insert into genre (name) values ('pop');
insert into genre (name) values ('rock');
insert into genre (name) values ('electronic');
insert into genre (name) values ('hiphop');
insert into genre (name) values ('jazz');
insert into genre (name) values ('indie');
insert into genre (name) values ('soundtrack');
insert into genre (name) values ('classical');
insert into genre (name) values ('chillout');
insert into genre (name) values ('ambient');
insert into genre (name) values ('folk');
insert into genre (name) values ('metal');
insert into genre (name) values ('latina');
insert into genre (name) values ('rnb');
insert into genre (name) values ('reggae');
insert into genre (name) values ('punk');
insert into genre (name) values ('country');
insert into genre (name) values ('house');
insert into genre (name) values ('blues');
insert into genre (name) values ('others');



insert into leyenda_tags (nombre, genre) values ('acidjazz', 2);
insert into leyenda_tags (nombre, genre) values ('African', 15);
insert into leyenda_tags (nombre, genre) values ('afro-cuban jazz', 3);
insert into leyenda_tags (nombre, genre) values ('alternativerock', 20);
insert into leyenda_tags (nombre, genre) values ('Ambient', 6);
insert into leyenda_tags (nombre, genre) values ('ambientdub', 15);
insert into leyenda_tags (nombre, genre) values ('americana', 16);
insert into leyenda_tags (nombre, genre) values ('artrock', 2);
insert into leyenda_tags (nombre, genre) values ('Asian', 12);
insert into leyenda_tags (nombre, genre) values ('Avant-garde', 19);
insert into leyenda_tags (nombre, genre) values ('bachata', 10);
insert into leyenda_tags (nombre, genre) values ('balkan', 6);
insert into leyenda_tags (nombre, genre) values ('baroque', 12);
insert into leyenda_tags (nombre, genre) values ('batucada', 6);
insert into leyenda_tags (nombre, genre) values ('Bebop', 20);
insert into leyenda_tags (nombre, genre) values ('blackmetal', 6);
insert into leyenda_tags (nombre, genre) values ('bluegrass', 18);
insert into leyenda_tags (nombre, genre) values ('Blues', 16);
insert into leyenda_tags (nombre, genre) values ('bluesrock', 10);
insert into leyenda_tags (nombre, genre) values ('bolero', 16);
insert into leyenda_tags (nombre, genre) values ('bossanova', 1);
insert into leyenda_tags (nombre, genre) values ('Breakbeat', 4);
insert into leyenda_tags (nombre, genre) values ('Breakcore', 10);
insert into leyenda_tags (nombre, genre) values ('britpop', 6);
insert into leyenda_tags (nombre, genre) values ('calypso', 4);
insert into leyenda_tags (nombre, genre) values ('caribbean', 16);
insert into leyenda_tags (nombre, genre) values ('Celtic', 12);
insert into leyenda_tags (nombre, genre) values ('chamber', 17);
insert into leyenda_tags (nombre, genre) values ('chansonfrancaise', 10);
insert into leyenda_tags (nombre, genre) values ('Chillout', 2);
insert into leyenda_tags (nombre, genre) values ('christian', 11);
insert into leyenda_tags (nombre, genre) values ('Classical', 15);
insert into leyenda_tags (nombre, genre) values ('classicrock', 14);
insert into leyenda_tags (nombre, genre) values ('coldwave', 1);
insert into leyenda_tags (nombre, genre) values ('Country', 17);
insert into leyenda_tags (nombre, genre) values ('countryrock', 2);
insert into leyenda_tags (nombre, genre) values ('crust', 10);
insert into leyenda_tags (nombre, genre) values ('cumbia', 12);
insert into leyenda_tags (nombre, genre) values ('Dance', 5);
insert into leyenda_tags (nombre, genre) values ('Dancehall', 10);
insert into leyenda_tags (nombre, genre) values ('Dark Wave', 17);
insert into leyenda_tags (nombre, genre) values ('darkambient', 12);
insert into leyenda_tags (nombre, genre) values ('darkstep', 10);
insert into leyenda_tags (nombre, genre) values ('death', 16);
insert into leyenda_tags (nombre, genre) values ('deathcore', 9);
insert into leyenda_tags (nombre, genre) values ('deathmetal', 4);
insert into leyenda_tags (nombre, genre) values ('deephouse', 11);
insert into leyenda_tags (nombre, genre) values ('Disco', 2);
insert into leyenda_tags (nombre, genre) values ('doom', 19);
insert into leyenda_tags (nombre, genre) values ('doommetal', 20);
insert into leyenda_tags (nombre, genre) values ('Downtempo', 15);
insert into leyenda_tags (nombre, genre) values ('dreampop', 18);
insert into leyenda_tags (nombre, genre) values ('Drone', 7);
insert into leyenda_tags (nombre, genre) values ('drumnbass', 16);
insert into leyenda_tags (nombre, genre) values ('Dub', 13);
insert into leyenda_tags (nombre, genre) values ('Dubstep', 2);
insert into leyenda_tags (nombre, genre) values ('EBM', 10);
insert into leyenda_tags (nombre, genre) values ('edm', 6);
insert into leyenda_tags (nombre, genre) values ('electrohouse', 1);
insert into leyenda_tags (nombre, genre) values ('Electronic', 11);
insert into leyenda_tags (nombre, genre) values ('electronica', 17);
insert into leyenda_tags (nombre, genre) values ('Electropop', 13);
insert into leyenda_tags (nombre, genre) values ('electropunk', 15);
insert into leyenda_tags (nombre, genre) values ('electrorock', 8);
insert into leyenda_tags (nombre, genre) values ('electroswing', 13);
insert into leyenda_tags (nombre, genre) values ('emo', 1);
insert into leyenda_tags (nombre, genre) values ('Ethno', 17);
insert into leyenda_tags (nombre, genre) values ('Eurodance', 15);
insert into leyenda_tags (nombre, genre) values ('Experimental', 1);
insert into leyenda_tags (nombre, genre) values ('fado', 19);
insert into leyenda_tags (nombre, genre) values ('Flamenco', 9);
insert into leyenda_tags (nombre, genre) values ('Folk', 2);
insert into leyenda_tags (nombre, genre) values ('freejazz', 19);
insert into leyenda_tags (nombre, genre) values ('Funk', 6);
insert into leyenda_tags (nombre, genre) values ('gangstarap', 6);
insert into leyenda_tags (nombre, genre) values ('Garage', 11);
insert into leyenda_tags (nombre, genre) values ('Gipsy', 2);
insert into leyenda_tags (nombre, genre) values ('Glitch', 19);
insert into leyenda_tags (nombre, genre) values ('Gospel', 7);
insert into leyenda_tags (nombre, genre) values ('Gothic', 19);
insert into leyenda_tags (nombre, genre) values ('grime', 12);
insert into leyenda_tags (nombre, genre) values ('Grindcore', 15);
insert into leyenda_tags (nombre, genre) values ('groovemetal', 16);
insert into leyenda_tags (nombre, genre) values ('Grunge', 18);
insert into leyenda_tags (nombre, genre) values ('Gypsy', 11);
insert into leyenda_tags (nombre, genre) values ('Hardcore', 14);
insert into leyenda_tags (nombre, genre) values ('hardcorepunk', 10);
insert into leyenda_tags (nombre, genre) values ('hardrock', 19);
insert into leyenda_tags (nombre, genre) values ('hardstep', 18);
insert into leyenda_tags (nombre, genre) values ('heavymetal', 2);
insert into leyenda_tags (nombre, genre) values ('hiphop', 4);
insert into leyenda_tags (nombre, genre) values ('House', 9);
insert into leyenda_tags (nombre, genre) values ('IDM', 11);
insert into leyenda_tags (nombre, genre) values ('indian', 12);
insert into leyenda_tags (nombre, genre) values ('Indie', 13);
insert into leyenda_tags (nombre, genre) values ('indiepop', 2);
insert into leyenda_tags (nombre, genre) values ('indierock', 7);
insert into leyenda_tags (nombre, genre) values ('indietronica', 4);
insert into leyenda_tags (nombre, genre) values ('Industrial', 15);
insert into leyenda_tags (nombre, genre) values ('industrialmetal', 8);
insert into leyenda_tags (nombre, genre) values ('industrialrock', 20);
insert into leyenda_tags (nombre, genre) values ('Jazz', 18);
insert into leyenda_tags (nombre, genre) values ('jazzfunk', 5);
insert into leyenda_tags (nombre, genre) values ('jazzfusion', 11);
insert into leyenda_tags (nombre, genre) values ('jpop', 4);
insert into leyenda_tags (nombre, genre) values ('Jungle', 6);
insert into leyenda_tags (nombre, genre) values ('kpop', 12);
insert into leyenda_tags (nombre, genre) values ('krautrock', 16);
insert into leyenda_tags (nombre, genre) values ('Latin', 16);
insert into leyenda_tags (nombre, genre) values ('latinjazz', 17);
insert into leyenda_tags (nombre, genre) values ('lofi', 9);
insert into leyenda_tags (nombre, genre) values ('mambo', 14);
insert into leyenda_tags (nombre, genre) values ('Manouche', 6);
insert into leyenda_tags (nombre, genre) values ('march', 14);
insert into leyenda_tags (nombre, genre) values ('mariachi', 18);
insert into leyenda_tags (nombre, genre) values ('mathcore', 1);
insert into leyenda_tags (nombre, genre) values ('mathrock', 3);
insert into leyenda_tags (nombre, genre) values ('merengue', 20);
insert into leyenda_tags (nombre, genre) values ('Metal', 6);
insert into leyenda_tags (nombre, genre) values ('Metalcore', 13);
insert into leyenda_tags (nombre, genre) values ('middleeastern', 18);
insert into leyenda_tags (nombre, genre) values ('neoclassical', 12);
insert into leyenda_tags (nombre, genre) values ('neurofunk', 8);
insert into leyenda_tags (nombre, genre) values ('newage', 3);
insert into leyenda_tags (nombre, genre) values ('newwave', 7);
insert into leyenda_tags (nombre, genre) values ('noisepop', 16);
insert into leyenda_tags (nombre, genre) values ('noiserock', 14);
insert into leyenda_tags (nombre, genre) values ('nujazz', 6);
insert into leyenda_tags (nombre, genre) values ('numetal', 17);
insert into leyenda_tags (nombre, genre) values ('opera', 15);
insert into leyenda_tags (nombre, genre) values ('Oriental', 11);
insert into leyenda_tags (nombre, genre) values ('Pop', 10);
insert into leyenda_tags (nombre, genre) values ('poppunk', 13);
insert into leyenda_tags (nombre, genre) values ('poprock', 8);
insert into leyenda_tags (nombre, genre) values ('postgrunge', 2);
insert into leyenda_tags (nombre, genre) values ('posthardcore', 17);
insert into leyenda_tags (nombre, genre) values ('postmetal', 3);
insert into leyenda_tags (nombre, genre) values ('postpunk', 9);
insert into leyenda_tags (nombre, genre) values ('postrock', 14);
insert into leyenda_tags (nombre, genre) values ('powermetal', 12);
insert into leyenda_tags (nombre, genre) values ('progressivehouse', 17);
insert into leyenda_tags (nombre, genre) values ('progressivemetal', 19);
insert into leyenda_tags (nombre, genre) values ('progressiverock', 1);
insert into leyenda_tags (nombre, genre) values ('Psytrance', 6);
insert into leyenda_tags (nombre, genre) values ('Punk', 14);
insert into leyenda_tags (nombre, genre) values ('Ragga', 7);
insert into leyenda_tags (nombre, genre) values ('ragtime', 19);
insert into leyenda_tags (nombre, genre) values ('rai', 19);
insert into leyenda_tags (nombre, genre) values ('rap', 18);
insert into leyenda_tags (nombre, genre) values ('Reggae', 17);
insert into leyenda_tags (nombre, genre) values ('reggaeton', 19);
insert into leyenda_tags (nombre, genre) values ('rnb', 15);
insert into leyenda_tags (nombre, genre) values ('Rock', 8);
insert into leyenda_tags (nombre, genre) values ('rockabilly', 18);
insert into leyenda_tags (nombre, genre) values ('rocknroll', 11);
insert into leyenda_tags (nombre, genre) values ('rocksteady', 4);
insert into leyenda_tags (nombre, genre) values ('rumba', 2);
insert into leyenda_tags (nombre, genre) values ('salsa', 12);
insert into leyenda_tags (nombre, genre) values ('Samba', 10);
insert into leyenda_tags (nombre, genre) values ('shoegaze', 19);
insert into leyenda_tags (nombre, genre) values ('singersongwriter', 13);
insert into leyenda_tags (nombre, genre) values ('Ska', 6);
insert into leyenda_tags (nombre, genre) values ('skapunk', 5);
insert into leyenda_tags (nombre, genre) values ('sludge', 12);
insert into leyenda_tags (nombre, genre) values ('smoothjazz', 17);
insert into leyenda_tags (nombre, genre) values ('Soul', 10);
insert into leyenda_tags (nombre, genre) values ('Soundtrack', 8);
insert into leyenda_tags (nombre, genre) values ('southernrock', 15);
insert into leyenda_tags (nombre, genre) values ('spacerock', 8);
insert into leyenda_tags (nombre, genre) values ('speedmetal', 19);
insert into leyenda_tags (nombre, genre) values ('spokenword', 15);
insert into leyenda_tags (nombre, genre) values ('stoner', 10);
insert into leyenda_tags (nombre, genre) values ('surf', 17);
insert into leyenda_tags (nombre, genre) values ('surfrock', 12);
insert into leyenda_tags (nombre, genre) values ('swing', 13);
insert into leyenda_tags (nombre, genre) values ('Symphonic', 13);
insert into leyenda_tags (nombre, genre) values ('Synthpop', 12);
insert into leyenda_tags (nombre, genre) values ('synthwave', 20);
insert into leyenda_tags (nombre, genre) values ('Tango', 8);
insert into leyenda_tags (nombre, genre) values ('Techno', 20);
insert into leyenda_tags (nombre, genre) values ('thrashmetal', 4);
insert into leyenda_tags (nombre, genre) values ('Trance', 4);
insert into leyenda_tags (nombre, genre) values ('trap', 10);
insert into leyenda_tags (nombre, genre) values ('Tribal', 1);
insert into leyenda_tags (nombre, genre) values ('triphop', 3);
insert into leyenda_tags (nombre, genre) values ('tropicalhouse', 16);
insert into leyenda_tags (nombre, genre) values ('waltz', 16);
insert into leyenda_tags (nombre, genre) values ('Western', 3);
insert into leyenda_tags (nombre, genre) values ('World', 15);
insert into leyenda_tags (nombre, genre) values ('zouk', 14);
insert into leyenda_tags (nombre, genre) values ('acidhouse', 4); 

insert into users (name, lastname, username, password, email, sex) values ('jhonny', 'meneses', 'jtst',  md5('1234'), 'jhonnymeneses13@gmail.com', 'h');
insert into users (name, lastname, username, password, email, sex) values ('albert', 'balbastre', 'albalbastre',  md5('1234'), 'albertsoyyo@gmail.com', 'h');
insert into users (name, lastname, username, password, email, sex) values ('jordi', 'capellades', 'jordankesley',  md5('1234'), 'jcapelladese@gmail.com', 'h');
--insert into tracks (id, name, duration, releasedate, dumpdate, artist_id, artist_name, album_image, audio, audiodownload, image, album_name, shorturl) values(1501986, 'Empty Streets',249, '2017-12-05', '2018-04-25', 505236, 'Omonoko', 'https://imgjam1.jamendo.com/albums/s172/172995/covers/1.200.jpg', 'https://mp3l.jamendo.com/?trackid=1501986&format=mp31&from=app-e106f235', 'https://mp3d.jamendo.com/download/track/1501986/mp32/', 'https://imgjam1.jamendo.com/albums/s172/172995/covers/1.200.jpg', 'Strong', 'http://jamen.do/t/1161940');
--insert into leyenda_mood (nombre) values ('happy');
--insert into leyenda_mood (nombre) values ('sad');
--insert into leyenda_mood (nombre) values ('angry');
--insert into leyenda_mood (nombre) values ('energetic');
--insert into moods (id_leyenda_mood, id_track) values ( 2, 1501986);
--insert into moods (id_leyenda_mood, id_track) values (4,  1501986);
--insert into votos_moods values(1, 'like', now(), 2);

--insert into playlist (title, users_id) values ('my playlist', 2);
--insert into playlist (title, users_id) values ('trapeo', 3);

--insert into playlist_songs values(1, 1501986);

--insert into tags (id_track, id_leyenda_tag) values (1501986, 3);
--insert into votos_tag values(1, 'like', now(), 3); --eliminar segunda columna
--insert into votos_tag values(1, 'dislike', now(), 2); --eliminar segunda columna
--insert into votos_tag values(1, 'zero', now(), 1); --eliminar segunda columna

-- el usuario con id = 2 cambia de opinion y opina que le gusta el tag propuesto 1
--insert into votos_tag values(1, 'like', now(), 2) ON CONFLICT (id_tags, id_users) DO UPDATE SET vote = excluded.vote;


-- damos grant a albert(admin server) para hacer insert select delete y update a las tablas
grant SELECT ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag to admin_moosic;
grant INSERT ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag to admin_moosic;
grant DELETE ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag to admin_moosic;
grant UPDATE ON genre, leyenda_mood, leyenda_tags, moods, playlist, playlist_songs, tags, tracks, users, votos_moods, votos_tag to admin_moosic;

-- damos permiso al uso y consulta de las secuencias para que se autogenere el id en las tablas
GRANT USAGE, SELECT ON SEQUENCE genre_id_seq, leyenda_mood_id_seq,moods_id_seq,users_id_seq,leyenda_tags_id_seq,playlist_id_seq,tags_id_seq to admin_moosic;

-- En la siguiente query, consultaremos las canciones de la playlist de nombre 'my playlist' para obtener las canciones.
--select users_id, title, name, audio from playlist pl join playlist_songs ps on pl.id = ps.playlist_id join tracks tr on ps.tracks_id = tr.id where pl.title = 'my playlist'; 
