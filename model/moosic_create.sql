-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2018-04-16 16:35:33.511

-- tables
-- Table: genre
\c template1;
drop database moosic_2;
create database moosic_2;
\c moosic_2;

CREATE TABLE genre (
    id_genre int  NOT NULL,
    name varchar(30)  NOT NULL,
    CONSTRAINT genre_pk PRIMARY KEY (id_genre)
);

-- Table: mood
CREATE TABLE mood (
    mood varchar(25)  NOT NULL,
    fecha date  NOT NULL,
    tracks_id_song bigint  NOT NULL,
    users_id_user bigint  NOT NULL,
    CONSTRAINT mood_pk PRIMARY KEY (mood)
);

-- Table: playlist
CREATE TABLE playlist (
    id bigint  NOT NULL,
    title varchar(20)  NOT NULL,
    user_id bigint  NOT NULL,
    CONSTRAINT playlist_pk PRIMARY KEY (id)
);

-- Table: playlist_songs
CREATE TABLE playlist_songs (
    playlist_id bigint  NOT NULL,
    track_id bigint  NOT NULL
);

-- Table: subgenre
CREATE TABLE subgenre (
    id_subgenre int  NOT NULL,
    name varchar(30)  NOT NULL,
    "group" int  NOT NULL,
    CONSTRAINT subgenre_pk PRIMARY KEY (id_subgenre)
);

-- Table: tags
CREATE TABLE tags (
    id_tag bigint  NOT NULL,
    name varchar(24)  NOT NULL,
    likes int  NOT NULL,
    dislikes int  NOT NULL,
    fecha_votacion date  NOT NULL,
    tracks_id bigint  NOT NULL,
    users_id_user bigint  NOT NULL,
    CONSTRAINT tags_pk PRIMARY KEY (id_tag)
);

-- Table: tracks
CREATE TABLE tracks (
    id_song bigint  NOT NULL,
    name varchar(40)  NOT NULL,
    artist_id bigint  NOT NULL,
    artist_name varchar(40)  NOT NULL,
    album_image varchar(150)  NOT NULL,
    audio varchar(150)  NOT NULL,
    audiodownload varchar(150)  NOT NULL,
    image varchar(150)  NOT NULL,
    album_name varchar(25)  NOT NULL,
    genre int  NOT NULL,
    CONSTRAINT tracks_pk PRIMARY KEY (id_song)
);

-- Table: users
CREATE TABLE users (
    id_user bigint  NOT NULL,
    name varchar(24)  NOT NULL,
    lastname varchar(32)  NOT NULL,
    username varchar(40)  NOT NULL,
    password varchar(40)  NOT NULL,
    email varchar(60)  NOT NULL,
    sex char(1)  NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id_user)
);

-- foreign keys
-- Reference: mood_tracks (table: mood)
ALTER TABLE mood ADD CONSTRAINT mood_tracks
    FOREIGN KEY (tracks_id_song)
    REFERENCES tracks (id_song)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: mood_users (table: mood)
ALTER TABLE mood ADD CONSTRAINT mood_users
    FOREIGN KEY (users_id_user)
    REFERENCES users (id_user)  
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
    FOREIGN KEY (track_id)
    REFERENCES tracks (id_song)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: playlist_users (table: playlist)
ALTER TABLE playlist ADD CONSTRAINT playlist_users
    FOREIGN KEY (user_id)
    REFERENCES users (id_user)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: subgenre_genre (table: subgenre)
ALTER TABLE subgenre ADD CONSTRAINT subgenre_genre
    FOREIGN KEY ("group")
    REFERENCES genre (id_genre)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: tags_tracks (table: tags)
ALTER TABLE tags ADD CONSTRAINT tags_tracks
    FOREIGN KEY (tracks_id)
    REFERENCES tracks (id_song)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: tags_users (table: tags)
ALTER TABLE tags ADD CONSTRAINT tags_users
    FOREIGN KEY (users_id_user)
    REFERENCES users (id_user)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: tracks_all_genres (table: tracks)
ALTER TABLE tracks ADD CONSTRAINT tracks_all_genres
    FOREIGN KEY (genre)
    REFERENCES subgenre (id_subgenre)  
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



insert into subgenre values(1, 'acidhouse', 3); 
insert into subgenre values(2, 'acidjazz', 5); 
insert into subgenre values(3, 'African', 2); 
insert into subgenre values(4, 'afro-cuban jazz', 15); 
insert into subgenre values(5, 'alternativerock', 15); 
insert into subgenre values(6, 'Ambient', 16); 
insert into subgenre values(7, 'ambientdub', 2); 
insert into subgenre values(8, 'americana', 2); 
insert into subgenre values(9, 'artrock', 14); 
insert into subgenre values(10, 'Asian', 14); 
insert into subgenre values(11, 'Avant-garde', 19); 
insert into subgenre values(12, 'bachata', 11); 
insert into subgenre values(13, 'balkan', 16); 
insert into subgenre values(14, 'baroque', 10); 
insert into subgenre values(15, 'batucada', 10); 
insert into subgenre values(16, 'Bebop', 15); 
insert into subgenre values(17, 'blackmetal', 19); 
insert into subgenre values(18, 'bluegrass', 6); 
insert into subgenre values(19, 'Blues', 5); 
insert into subgenre values(20, 'bluesrock', 1); 
insert into subgenre values(21, 'bolero', 12); 
insert into subgenre values(22, 'bossanova', 13); 
insert into subgenre values(23, 'Breakbeat', 16); 
insert into subgenre values(24, 'Breakcore', 18); 
insert into subgenre values(25, 'britpop', 4); 
insert into subgenre values(26, 'calypso', 17); 
insert into subgenre values(27, 'caribbean', 11); 
insert into subgenre values(28, 'Celtic', 14); 
insert into subgenre values(29, 'chamber', 10); 
insert into subgenre values(30, 'chansonfrancaise', 12); 
insert into subgenre values(31, 'Chillout', 3); 
insert into subgenre values(32, 'christian', 18); 
insert into subgenre values(33, 'Classical', 18); 
insert into subgenre values(34, 'classicrock', 19); 
insert into subgenre values(35, 'coldwave', 20); 
insert into subgenre values(36, 'Country', 2); 
insert into subgenre values(37, 'countryrock', 12); 
insert into subgenre values(38, 'crust', 15); 
insert into subgenre values(39, 'cumbia', 9); 
insert into subgenre values(40, 'Dance', 2); 
insert into subgenre values(41, 'Dancehall', 5); 
insert into subgenre values(42, 'Dark Wave', 6); 
insert into subgenre values(43, 'darkambient', 14); 
insert into subgenre values(44, 'darkstep', 10); 
insert into subgenre values(45, 'death', 15); 
insert into subgenre values(46, 'deathcore', 12); 
insert into subgenre values(47, 'deathmetal', 4); 
insert into subgenre values(48, 'deephouse', 6); 
insert into subgenre values(49, 'Disco', 7); 
insert into subgenre values(50, 'doom', 6); 
insert into subgenre values(51, 'doommetal', 14); 
insert into subgenre values(52, 'Downtempo', 3); 
insert into subgenre values(53, 'dreampop', 5); 
insert into subgenre values(54, 'Drone', 14); 
insert into subgenre values(55, 'drumnbass', 4); 
insert into subgenre values(56, 'Dub', 14); 
insert into subgenre values(57, 'Dubstep', 5); 
insert into subgenre values(58, 'EBM', 20); 
insert into subgenre values(59, 'edm', 20); 
insert into subgenre values(60, 'electrohouse', 20); 
insert into subgenre values(61, 'Electronic', 11); 
insert into subgenre values(62, 'electronica', 14); 
insert into subgenre values(63, 'Electropop', 20); 
insert into subgenre values(64, 'electropunk', 8); 
insert into subgenre values(65, 'electrorock', 12); 
insert into subgenre values(66, 'electroswing', 16); 
insert into subgenre values(67, 'emo', 3); 
insert into subgenre values(68, 'Ethno', 11); 
insert into subgenre values(69, 'Eurodance', 13); 
insert into subgenre values(70, 'Experimental', 16); 
insert into subgenre values(71, 'fado', 9); 
insert into subgenre values(72, 'Flamenco', 14); 
insert into subgenre values(73, 'Folk', 19); 
insert into subgenre values(74, 'freejazz', 17); 
insert into subgenre values(75, 'Funk', 14); 
insert into subgenre values(76, 'gangstarap', 6); 
insert into subgenre values(77, 'Garage', 7); 
insert into subgenre values(78, 'Gipsy', 18); 
insert into subgenre values(79, 'Glitch', 3); 
insert into subgenre values(80, 'Gospel', 1); 
insert into subgenre values(81, 'Gothic', 6); 
insert into subgenre values(82, 'grime', 8); 
insert into subgenre values(83, 'Grindcore', 6); 
insert into subgenre values(84, 'groovemetal', 12); 
insert into subgenre values(85, 'Grunge', 11); 
insert into subgenre values(86, 'Gypsy', 7); 
insert into subgenre values(87, 'Hardcore', 7); 
insert into subgenre values(88, 'hardcorepunk', 2); 
insert into subgenre values(89, 'hardrock', 20); 
insert into subgenre values(90, 'hardstep', 9); 
insert into subgenre values(91, 'heavymetal', 12); 
insert into subgenre values(92, 'hiphop', 16); 
insert into subgenre values(93, 'House', 8); 
insert into subgenre values(94, 'IDM', 17); 
insert into subgenre values(95, 'indian', 3); 
insert into subgenre values(96, 'Indie', 5); 
insert into subgenre values(97, 'indiepop', 14); 
insert into subgenre values(98, 'indierock', 13); 
insert into subgenre values(99, 'indietronica', 8); 
insert into subgenre values(100, 'Industrial', 15); 
insert into subgenre values(101, 'industrialmetal', 18); 
insert into subgenre values(102, 'industrialrock', 7); 
insert into subgenre values(103, 'Jazz', 3); 
insert into subgenre values(104, 'jazzfunk', 11); 
insert into subgenre values(105, 'jazzfusion', 16); 
insert into subgenre values(106, 'jpop', 3); 
insert into subgenre values(107, 'Jungle', 2); 
insert into subgenre values(108, 'kpop', 1); 
insert into subgenre values(109, 'krautrock', 5); 
insert into subgenre values(110, 'Latin', 2); 
insert into subgenre values(111, 'latinjazz', 2); 
insert into subgenre values(112, 'lofi', 20); 
insert into subgenre values(113, 'mambo', 12); 
insert into subgenre values(114, 'Manouche', 17); 
insert into subgenre values(115, 'march', 8); 
insert into subgenre values(116, 'mariachi', 5); 
insert into subgenre values(117, 'mathcore', 11); 
insert into subgenre values(118, 'mathrock', 4); 
insert into subgenre values(119, 'merengue', 20); 
insert into subgenre values(120, 'Metal', 2); 
insert into subgenre values(121, 'Metalcore', 13); 
insert into subgenre values(122, 'middleeastern', 10); 
insert into subgenre values(123, 'neoclassical', 8); 
insert into subgenre values(124, 'neurofunk', 15); 
insert into subgenre values(125, 'newage', 20); 
insert into subgenre values(126, 'newwave', 1); 
insert into subgenre values(127, 'noisepop', 17); 
insert into subgenre values(128, 'noiserock', 9); 
insert into subgenre values(129, 'nujazz', 10); 
insert into subgenre values(130, 'numetal', 18); 
insert into subgenre values(131, 'opera', 18); 
insert into subgenre values(132, 'Oriental', 2); 
insert into subgenre values(133, 'Pop', 11); 
insert into subgenre values(134, 'poppunk', 16); 
insert into subgenre values(135, 'poprock', 14); 
insert into subgenre values(136, 'postgrunge', 12); 
insert into subgenre values(137, 'posthardcore', 15); 
insert into subgenre values(138, 'postmetal', 11); 
insert into subgenre values(139, 'postpunk', 2); 
insert into subgenre values(140, 'postrock', 19); 
insert into subgenre values(141, 'powermetal', 1); 
insert into subgenre values(142, 'progressivehouse', 2); 
insert into subgenre values(143, 'progressivemetal', 2); 
insert into subgenre values(144, 'progressiverock', 17); 
insert into subgenre values(145, 'Psytrance', 14); 
insert into subgenre values(146, 'Punk', 4); 
insert into subgenre values(147, 'Ragga', 3); 
insert into subgenre values(148, 'ragtime', 3); 
insert into subgenre values(149, 'rai', 4); 
insert into subgenre values(150, 'rap', 1); 
insert into subgenre values(151, 'Reggae', 12); 
insert into subgenre values(152, 'reggaeton', 12); 
insert into subgenre values(153, 'rnb', 10); 
insert into subgenre values(154, 'Rock', 6); 
insert into subgenre values(155, 'rockabilly', 9); 
insert into subgenre values(156, 'rocknroll', 10); 
insert into subgenre values(157, 'rocksteady', 6); 
insert into subgenre values(158, 'rumba', 4); 
insert into subgenre values(159, 'salsa', 2); 
insert into subgenre values(160, 'Samba', 11); 
insert into subgenre values(161, 'shoegaze', 5); 
insert into subgenre values(162, 'singersongwriter', 8); 
insert into subgenre values(163, 'Ska', 7); 
insert into subgenre values(164, 'skapunk', 9); 
insert into subgenre values(165, 'sludge', 12); 
insert into subgenre values(166, 'smoothjazz', 18); 
insert into subgenre values(167, 'Soul', 15); 
insert into subgenre values(168, 'Soundtrack', 12); 
insert into subgenre values(169, 'southernrock', 16); 
insert into subgenre values(170, 'spacerock', 10); 
insert into subgenre values(171, 'speedmetal', 14); 
insert into subgenre values(172, 'spokenword', 3); 
insert into subgenre values(173, 'stoner', 14); 
insert into subgenre values(174, 'surf', 18); 
insert into subgenre values(175, 'surfrock', 19); 
insert into subgenre values(176, 'swing', 11); 
insert into subgenre values(177, 'Symphonic', 12); 
insert into subgenre values(178, 'Synthpop', 10); 
insert into subgenre values(179, 'synthwave', 5); 
insert into subgenre values(180, 'Tango', 17); 
insert into subgenre values(181, 'Techno', 5); 
insert into subgenre values(182, 'thrashmetal', 5); 
insert into subgenre values(183, 'Trance', 19); 
insert into subgenre values(184, 'trap', 7); 
insert into subgenre values(185, 'Tribal', 13); 
insert into subgenre values(186, 'triphop', 16); 
insert into subgenre values(187, 'tropicalhouse', 9); 
insert into subgenre values(188, 'waltz', 20); 
insert into subgenre values(189, 'Western', 17); 
insert into subgenre values(190, 'World', 12); 
insert into subgenre values(191, 'zouk', 17); 


insert into users values (1, 'jhonny', 'meneses', 'jtst',  md5('1234'), 'jhonnymeneses13@gmail.com', 'h');
insert into users values (2, 'albert', 'balbastre', 'albalbastre',  md5('1234'), 'albertsoyyo@gmail.com', 'h');
insert into users values (3, 'jordi', 'capellades', 'jordankesley',  md5('1234'), 'jcapelladese@gmail.com', 'h');

insert into tracks values(1501986, 'Empty Streets', 505236, 'Omonoko', 'https://imgjam1.jamendo.com/albums/s172/172995/covers/1.200.jpg', 'https://mp3l.jamendo.com/?trackid=1501986&format=mp31&from=app-e106f235', 'https://mp3d.jamendo.com/download/track/1501986/mp32/', 'https://imgjam1.jamendo.com/albums/s172/172995/covers/1.200.jpg', 'Strong', 3);

