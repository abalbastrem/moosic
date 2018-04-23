-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2018-04-18 16:20:29.693

-- tables
-- Table: genre
\c template1;
drop database moosic_final;
create database moosic_final;
\c moosic_final;


CREATE TABLE genre (
    id bigint  NOT NULL,
    name varchar(30)  NOT NULL,
    CONSTRAINT genre_pk PRIMARY KEY (id)
);

-- Table: leyenda_mood
CREATE TABLE leyenda_mood (
    id bigint  NOT NULL,
    nombre varchar(40)  NOT NULL,
    CONSTRAINT leyenda_mood_pk PRIMARY KEY (id)
);

-- Table: leyenda_tags
CREATE TABLE leyenda_tags (
    id bigint  NOT NULL,
    nombre varchar(30)  NOT NULL,
    genre bigint  NOT NULL,
    CONSTRAINT leyenda_tags_pk PRIMARY KEY (id)
);

-- Table: moods
CREATE TABLE moods (
    id bigint  NOT NULL,
    id_leyenda_mood bigint  NOT NULL,
    id_track bigint  NOT NULL,
    CONSTRAINT moods_ak_unique_FK_votosmood_id_moods UNIQUE (id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT moods_pk PRIMARY KEY (id_leyenda_mood,id_track)
);

-- Table: playlist
CREATE TABLE playlist (
    id bigint  NOT NULL,
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
    id bigint  NOT NULL,
    id_track bigint  NOT NULL,
    id_leyenda_tag bigint  NOT NULL,
    CONSTRAINT id UNIQUE (id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT tags_pk PRIMARY KEY (id_track,id_leyenda_tag)
);

-- Table: tracks
CREATE TABLE tracks (
    id bigint  NOT NULL,
    name varchar(40)  NOT NULL,
    artist_id bigint  NOT NULL,
    artist_name varchar(40)  NOT NULL,
    album_image varchar(150)  NOT NULL,
    audio varchar(150)  NOT NULL,
    audiodownload varchar(150)  NOT NULL,
    image varchar(150)  NOT NULL,
    album_name varchar(25)  NOT NULL,
    shortUrl varchar(150)  NOT NULL,
    CONSTRAINT tracks_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE users (
    id bigint  NOT NULL,
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

insert into genre values(1, 'pop');
insert into genre values(2, 'rock');
insert into genre values(3, 'electronic');
insert into genre values(4, 'hiphop');
insert into genre values(5, 'jazz');
insert into genre values(6, 'indie');
insert into genre values(7, 'soundtrack');
insert into genre values(8, 'classical');
insert into genre values(9, 'chillout');
insert into genre values(10, 'ambient');
insert into genre values(11, 'folk');
insert into genre values(12, 'metal');
insert into genre values(13, 'latina');
insert into genre values(14, 'rnb');
insert into genre values(15, 'reggae');
insert into genre values(16, 'punk');
insert into genre values(17, 'country');
insert into genre values(18, 'house');
insert into genre values(19, 'blues');
insert into genre values(20, 'others');



insert into leyenda_tags values(1, 'acidhouse', 3); 
insert into leyenda_tags values(2, 'acidjazz', 5); 
insert into leyenda_tags values(3, 'African', 2); 
insert into leyenda_tags values(4, 'afro-cuban jazz', 15); 
insert into leyenda_tags values(5, 'alternativerock', 15); 
insert into leyenda_tags values(6, 'Ambient', 16); 
insert into leyenda_tags values(7, 'ambientdub', 2); 
insert into leyenda_tags values(8, 'americana', 2); 
insert into leyenda_tags values(9, 'artrock', 14); 
insert into leyenda_tags values(10, 'Asian', 14); 
insert into leyenda_tags values(11, 'Avant-garde', 19); 
insert into leyenda_tags values(12, 'bachata', 11); 
insert into leyenda_tags values(13, 'balkan', 16); 
insert into leyenda_tags values(14, 'baroque', 10); 
insert into leyenda_tags values(15, 'batucada', 10); 
insert into leyenda_tags values(16, 'Bebop', 15); 
insert into leyenda_tags values(17, 'blackmetal', 19); 
insert into leyenda_tags values(18, 'bluegrass', 6); 
insert into leyenda_tags values(19, 'Blues', 5); 
insert into leyenda_tags values(20, 'bluesrock', 1); 
insert into leyenda_tags values(21, 'bolero', 12); 
insert into leyenda_tags values(22, 'bossanova', 13); 
insert into leyenda_tags values(23, 'Breakbeat', 16); 
insert into leyenda_tags values(24, 'Breakcore', 18); 
insert into leyenda_tags values(25, 'britpop', 4); 
insert into leyenda_tags values(26, 'calypso', 17); 
insert into leyenda_tags values(27, 'caribbean', 11); 
insert into leyenda_tags values(28, 'Celtic', 14); 
insert into leyenda_tags values(29, 'chamber', 10); 
insert into leyenda_tags values(30, 'chansonfrancaise', 12); 
insert into leyenda_tags values(31, 'Chillout', 3); 
insert into leyenda_tags values(32, 'christian', 18); 
insert into leyenda_tags values(33, 'Classical', 18); 
insert into leyenda_tags values(34, 'classicrock', 19); 
insert into leyenda_tags values(35, 'coldwave', 20); 
insert into leyenda_tags values(36, 'Country', 2); 
insert into leyenda_tags values(37, 'countryrock', 12); 
insert into leyenda_tags values(38, 'crust', 15); 
insert into leyenda_tags values(39, 'cumbia', 9); 
insert into leyenda_tags values(40, 'Dance', 2); 
insert into leyenda_tags values(41, 'Dancehall', 5); 
insert into leyenda_tags values(42, 'Dark Wave', 6); 
insert into leyenda_tags values(43, 'darkambient', 14); 
insert into leyenda_tags values(44, 'darkstep', 10); 
insert into leyenda_tags values(45, 'death', 15); 
insert into leyenda_tags values(46, 'deathcore', 12); 
insert into leyenda_tags values(47, 'deathmetal', 4); 
insert into leyenda_tags values(48, 'deephouse', 6); 
insert into leyenda_tags values(49, 'Disco', 7); 
insert into leyenda_tags values(50, 'doom', 6); 
insert into leyenda_tags values(51, 'doommetal', 14); 
insert into leyenda_tags values(52, 'Downtempo', 3); 
insert into leyenda_tags values(53, 'dreampop', 5); 
insert into leyenda_tags values(54, 'Drone', 14); 
insert into leyenda_tags values(55, 'drumnbass', 4); 
insert into leyenda_tags values(56, 'Dub', 14); 
insert into leyenda_tags values(57, 'Dubstep', 5); 
insert into leyenda_tags values(58, 'EBM', 20); 
insert into leyenda_tags values(59, 'edm', 20); 
insert into leyenda_tags values(60, 'electrohouse', 20); 
insert into leyenda_tags values(61, 'Electronic', 11); 
insert into leyenda_tags values(62, 'electronica', 14); 
insert into leyenda_tags values(63, 'Electropop', 20); 
insert into leyenda_tags values(64, 'electropunk', 8); 
insert into leyenda_tags values(65, 'electrorock', 12); 
insert into leyenda_tags values(66, 'electroswing', 16); 
insert into leyenda_tags values(67, 'emo', 3); 
insert into leyenda_tags values(68, 'Ethno', 11); 
insert into leyenda_tags values(69, 'Eurodance', 13); 
insert into leyenda_tags values(70, 'Experimental', 16); 
insert into leyenda_tags values(71, 'fado', 9); 
insert into leyenda_tags values(72, 'Flamenco', 14); 
insert into leyenda_tags values(73, 'Folk', 19); 
insert into leyenda_tags values(74, 'freejazz', 17); 
insert into leyenda_tags values(75, 'Funk', 14); 
insert into leyenda_tags values(76, 'gangstarap', 6); 
insert into leyenda_tags values(77, 'Garage', 7); 
insert into leyenda_tags values(78, 'Gipsy', 18); 
insert into leyenda_tags values(79, 'Glitch', 3); 
insert into leyenda_tags values(80, 'Gospel', 1); 
insert into leyenda_tags values(81, 'Gothic', 6); 
insert into leyenda_tags values(82, 'grime', 8); 
insert into leyenda_tags values(83, 'Grindcore', 6); 
insert into leyenda_tags values(84, 'groovemetal', 12); 
insert into leyenda_tags values(85, 'Grunge', 11); 
insert into leyenda_tags values(86, 'Gypsy', 7); 
insert into leyenda_tags values(87, 'Hardcore', 7); 
insert into leyenda_tags values(88, 'hardcorepunk', 2); 
insert into leyenda_tags values(89, 'hardrock', 20); 
insert into leyenda_tags values(90, 'hardstep', 9); 
insert into leyenda_tags values(91, 'heavymetal', 12); 
insert into leyenda_tags values(92, 'hiphop', 16); 
insert into leyenda_tags values(93, 'House', 8); 
insert into leyenda_tags values(94, 'IDM', 17); 
insert into leyenda_tags values(95, 'indian', 3); 
insert into leyenda_tags values(96, 'Indie', 5); 
insert into leyenda_tags values(97, 'indiepop', 14); 
insert into leyenda_tags values(98, 'indierock', 13); 
insert into leyenda_tags values(99, 'indietronica', 8); 
insert into leyenda_tags values(100, 'Industrial', 15); 
insert into leyenda_tags values(101, 'industrialmetal', 18); 
insert into leyenda_tags values(102, 'industrialrock', 7); 
insert into leyenda_tags values(103, 'Jazz', 3); 
insert into leyenda_tags values(104, 'jazzfunk', 11); 
insert into leyenda_tags values(105, 'jazzfusion', 16); 
insert into leyenda_tags values(106, 'jpop', 3); 
insert into leyenda_tags values(107, 'Jungle', 2); 
insert into leyenda_tags values(108, 'kpop', 1); 
insert into leyenda_tags values(109, 'krautrock', 5); 
insert into leyenda_tags values(110, 'Latin', 2); 
insert into leyenda_tags values(111, 'latinjazz', 2); 
insert into leyenda_tags values(112, 'lofi', 20); 
insert into leyenda_tags values(113, 'mambo', 12); 
insert into leyenda_tags values(114, 'Manouche', 17); 
insert into leyenda_tags values(115, 'march', 8); 
insert into leyenda_tags values(116, 'mariachi', 5); 
insert into leyenda_tags values(117, 'mathcore', 11); 
insert into leyenda_tags values(118, 'mathrock', 4); 
insert into leyenda_tags values(119, 'merengue', 20); 
insert into leyenda_tags values(120, 'Metal', 2); 
insert into leyenda_tags values(121, 'Metalcore', 13); 
insert into leyenda_tags values(122, 'middleeastern', 10); 
insert into leyenda_tags values(123, 'neoclassical', 8); 
insert into leyenda_tags values(124, 'neurofunk', 15); 
insert into leyenda_tags values(125, 'newage', 20); 
insert into leyenda_tags values(126, 'newwave', 1); 
insert into leyenda_tags values(127, 'noisepop', 17); 
insert into leyenda_tags values(128, 'noiserock', 9); 
insert into leyenda_tags values(129, 'nujazz', 10); 
insert into leyenda_tags values(130, 'numetal', 18); 
insert into leyenda_tags values(131, 'opera', 18); 
insert into leyenda_tags values(132, 'Oriental', 2); 
insert into leyenda_tags values(133, 'Pop', 11); 
insert into leyenda_tags values(134, 'poppunk', 16); 
insert into leyenda_tags values(135, 'poprock', 14); 
insert into leyenda_tags values(136, 'postgrunge', 12); 
insert into leyenda_tags values(137, 'posthardcore', 15); 
insert into leyenda_tags values(138, 'postmetal', 11); 
insert into leyenda_tags values(139, 'postpunk', 2); 
insert into leyenda_tags values(140, 'postrock', 19); 
insert into leyenda_tags values(141, 'powermetal', 1); 
insert into leyenda_tags values(142, 'progressivehouse', 2); 
insert into leyenda_tags values(143, 'progressivemetal', 2); 
insert into leyenda_tags values(144, 'progressiverock', 17); 
insert into leyenda_tags values(145, 'Psytrance', 14); 
insert into leyenda_tags values(146, 'Punk', 4); 
insert into leyenda_tags values(147, 'Ragga', 3); 
insert into leyenda_tags values(148, 'ragtime', 3); 
insert into leyenda_tags values(149, 'rai', 4); 
insert into leyenda_tags values(150, 'rap', 1); 
insert into leyenda_tags values(151, 'Reggae', 12); 
insert into leyenda_tags values(152, 'reggaeton', 12); 
insert into leyenda_tags values(153, 'rnb', 10); 
insert into leyenda_tags values(154, 'Rock', 6); 
insert into leyenda_tags values(155, 'rockabilly', 9); 
insert into leyenda_tags values(156, 'rocknroll', 10); 
insert into leyenda_tags values(157, 'rocksteady', 6); 
insert into leyenda_tags values(158, 'rumba', 4); 
insert into leyenda_tags values(159, 'salsa', 2); 
insert into leyenda_tags values(160, 'Samba', 11); 
insert into leyenda_tags values(161, 'shoegaze', 5); 
insert into leyenda_tags values(162, 'singersongwriter', 8); 
insert into leyenda_tags values(163, 'Ska', 7); 
insert into leyenda_tags values(164, 'skapunk', 9); 
insert into leyenda_tags values(165, 'sludge', 12); 
insert into leyenda_tags values(166, 'smoothjazz', 18); 
insert into leyenda_tags values(167, 'Soul', 15); 
insert into leyenda_tags values(168, 'Soundtrack', 12); 
insert into leyenda_tags values(169, 'southernrock', 16); 
insert into leyenda_tags values(170, 'spacerock', 10); 
insert into leyenda_tags values(171, 'speedmetal', 14); 
insert into leyenda_tags values(172, 'spokenword', 3); 
insert into leyenda_tags values(173, 'stoner', 14); 
insert into leyenda_tags values(174, 'surf', 18); 
insert into leyenda_tags values(175, 'surfrock', 19); 
insert into leyenda_tags values(176, 'swing', 11); 
insert into leyenda_tags values(177, 'Symphonic', 12); 
insert into leyenda_tags values(178, 'Synthpop', 10); 
insert into leyenda_tags values(179, 'synthwave', 5); 
insert into leyenda_tags values(180, 'Tango', 17); 
insert into leyenda_tags values(181, 'Techno', 5); 
insert into leyenda_tags values(182, 'thrashmetal', 5); 
insert into leyenda_tags values(183, 'Trance', 19); 
insert into leyenda_tags values(184, 'trap', 7); 
insert into leyenda_tags values(185, 'Tribal', 13); 
insert into leyenda_tags values(186, 'triphop', 16); 
insert into leyenda_tags values(187, 'tropicalhouse', 9); 
insert into leyenda_tags values(188, 'waltz', 20); 
insert into leyenda_tags values(189, 'Western', 17); 
insert into leyenda_tags values(190, 'World', 12); 
insert into leyenda_tags values(191, 'zouk', 17); 

insert into users values (1, 'jhonny', 'meneses', 'jtst',  md5('1234'), 'jhonnymeneses13@gmail.com', 'h');
insert into users values (2, 'albert', 'balbastre', 'albalbastre',  md5('1234'), 'albertsoyyo@gmail.com', 'h');
insert into users values (3, 'jordi', 'capellades', 'jordankesley',  md5('1234'), 'jcapelladese@gmail.com', 'h');
insert into tracks values(1501986, 'Empty Streets', 505236, 'Omonoko', 'https://imgjam1.jamendo.com/albums/s172/172995/covers/1.200.jpg', 'https://mp3l.jamendo.com/?trackid=1501986&format=mp31&from=app-e106f235', 'https://mp3d.jamendo.com/download/track/1501986/mp32/', 'https://imgjam1.jamendo.com/albums/s172/172995/covers/1.200.jpg', 'Strong', 'http://jamen.do/t/1161940');
insert into leyenda_mood values (1, 'happy');
insert into leyenda_mood values (2, 'sad');
insert into leyenda_mood values (3, 'angry');
insert into leyenda_mood values (4, 'energetic');
insert into moods values(1, 2, 1501986);
insert into votos_moods values(1, 'like', now(), 2);

insert into playlist values (1, 'my playlist', 2);
insert into playlist_songs values(1, 1501986);

insert into tags values (1, 1501986, 3);
insert into votos_tag values(1, 'like', now(), 3); --eliminar segunda columna
insert into votos_tag values(1, 'dislike', now(), 2); --eliminar segunda columna
insert into votos_tag values(1, 'zero', now(), 1); --eliminar segunda columna

-- el usuario con id = 2 cambia de opinion y opina que le gusta el tag propuesto 1
insert into votos_tag values(1, 'like', now(), 2) ON CONFLICT (id_tags, id_users) DO UPDATE SET vote = excluded.vote;

