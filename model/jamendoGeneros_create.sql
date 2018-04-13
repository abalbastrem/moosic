-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2018-04-12 18:11:42.197

-- tables
-- Table: subgenero
CREATE TABLE subgenero (
    id_genre int  NOT NULL,
    name varchar(30)  NOT NULL,
    "group" int  NOT NULL,
    CONSTRAINT subgenero_pk PRIMARY KEY (id_genre)
);

-- Table: genero
CREATE TABLE genero (
    id_genre int  NOT NULL,
    name varchar(30)  NOT NULL,
    CONSTRAINT genero_pk PRIMARY KEY (id_genre)
);

-- foreign keys
-- Reference: subgenero_genero (table: subgenero)
ALTER TABLE subgenero ADD CONSTRAINT subgenero_genero
    FOREIGN KEY ("group")
    REFERENCES genero (id_genre)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;


insert into genero values(1, 'pop');
insert into genero values(2, 'rock');
insert into genero values(3, 'electronic');
insert into genero values(4, 'hiphop');
insert into genero values(5, 'jazz');
insert into genero values(6, 'indie');
insert into genero values(7, 'soundtrack');
insert into genero values(8, 'classical');
insert into genero values(9, 'chillout');
insert into genero values(10, 'ambient');
insert into genero values(11, 'folk');
insert into genero values(12, 'metal');
insert into genero values(13, 'latina');
insert into genero values(14, 'rnb');
insert into genero values(15, 'reggae');
insert into genero values(16, 'punk');
insert into genero values(17, 'country');
insert into genero values(18, 'house');
insert into genero values(19, 'blues');
insert into genero values(20, 'others');



insert into subgenero values(1, 'acidhouse', 3); 
insert into subgenero values(2, 'acidjazz', 5); 
insert into subgenero values(3, 'African', 2); 
insert into subgenero values(4, 'afro-cuban jazz', 15); 
insert into subgenero values(5, 'alternativerock', 15); 
insert into subgenero values(6, 'Ambient', 16); 
insert into subgenero values(7, 'ambientdub', 2); 
insert into subgenero values(8, 'americana', 2); 
insert into subgenero values(9, 'artrock', 14); 
insert into subgenero values(10, 'Asian', 14); 
insert into subgenero values(11, 'Avant-garde', 19); 
insert into subgenero values(12, 'bachata', 11); 
insert into subgenero values(13, 'balkan', 16); 
insert into subgenero values(14, 'baroque', 10); 
insert into subgenero values(15, 'batucada', 10); 
insert into subgenero values(16, 'Bebop', 15); 
insert into subgenero values(17, 'blackmetal', 19); 
insert into subgenero values(18, 'bluegrass', 6); 
insert into subgenero values(19, 'Blues', 5); 
insert into subgenero values(20, 'bluesrock', 1); 
insert into subgenero values(21, 'bolero', 12); 
insert into subgenero values(22, 'bossanova', 13); 
insert into subgenero values(23, 'Breakbeat', 16); 
insert into subgenero values(24, 'Breakcore', 18); 
insert into subgenero values(25, 'britpop', 4); 
insert into subgenero values(26, 'calypso', 17); 
insert into subgenero values(27, 'caribbean', 11); 
insert into subgenero values(28, 'Celtic', 14); 
insert into subgenero values(29, 'chamber', 10); 
insert into subgenero values(30, 'chansonfrancaise', 12); 
insert into subgenero values(31, 'Chillout', 3); 
insert into subgenero values(32, 'christian', 18); 
insert into subgenero values(33, 'Classical', 18); 
insert into subgenero values(34, 'classicrock', 19); 
insert into subgenero values(35, 'coldwave', 20); 
insert into subgenero values(36, 'Country', 2); 
insert into subgenero values(37, 'countryrock', 12); 
insert into subgenero values(38, 'crust', 15); 
insert into subgenero values(39, 'cumbia', 9); 
insert into subgenero values(40, 'Dance', 2); 
insert into subgenero values(41, 'Dancehall', 5); 
insert into subgenero values(42, 'Dark Wave', 6); 
insert into subgenero values(43, 'darkambient', 14); 
insert into subgenero values(44, 'darkstep', 10); 
insert into subgenero values(45, 'death', 15); 
insert into subgenero values(46, 'deathcore', 12); 
insert into subgenero values(47, 'deathmetal', 4); 
insert into subgenero values(48, 'deephouse', 6); 
insert into subgenero values(49, 'Disco', 7); 
insert into subgenero values(50, 'doom', 6); 
insert into subgenero values(51, 'doommetal', 14); 
insert into subgenero values(52, 'Downtempo', 3); 
insert into subgenero values(53, 'dreampop', 5); 
insert into subgenero values(54, 'Drone', 14); 
insert into subgenero values(55, 'drumnbass', 4); 
insert into subgenero values(56, 'Dub', 14); 
insert into subgenero values(57, 'Dubstep', 5); 
insert into subgenero values(58, 'EBM', 20); 
insert into subgenero values(59, 'edm', 20); 
insert into subgenero values(60, 'electrohouse', 20); 
insert into subgenero values(61, 'Electronic', 11); 
insert into subgenero values(62, 'electronica', 14); 
insert into subgenero values(63, 'Electropop', 20); 
insert into subgenero values(64, 'electropunk', 8); 
insert into subgenero values(65, 'electrorock', 12); 
insert into subgenero values(66, 'electroswing', 16); 
insert into subgenero values(67, 'emo', 3); 
insert into subgenero values(68, 'Ethno', 11); 
insert into subgenero values(69, 'Eurodance', 13); 
insert into subgenero values(70, 'Experimental', 16); 
insert into subgenero values(71, 'fado', 9); 
insert into subgenero values(72, 'Flamenco', 14); 
insert into subgenero values(73, 'Folk', 19); 
insert into subgenero values(74, 'freejazz', 17); 
insert into subgenero values(75, 'Funk', 14); 
insert into subgenero values(76, 'gangstarap', 6); 
insert into subgenero values(77, 'Garage', 7); 
insert into subgenero values(78, 'Gipsy', 18); 
insert into subgenero values(79, 'Glitch', 3); 
insert into subgenero values(80, 'Gospel', 1); 
insert into subgenero values(81, 'Gothic', 6); 
insert into subgenero values(82, 'grime', 8); 
insert into subgenero values(83, 'Grindcore', 6); 
insert into subgenero values(84, 'groovemetal', 12); 
insert into subgenero values(85, 'Grunge', 11); 
insert into subgenero values(86, 'Gypsy', 7); 
insert into subgenero values(87, 'Hardcore', 7); 
insert into subgenero values(88, 'hardcorepunk', 2); 
insert into subgenero values(89, 'hardrock', 20); 
insert into subgenero values(90, 'hardstep', 9); 
insert into subgenero values(91, 'heavymetal', 12); 
insert into subgenero values(92, 'hiphop', 16); 
insert into subgenero values(93, 'House', 8); 
insert into subgenero values(94, 'IDM', 17); 
insert into subgenero values(95, 'indian', 3); 
insert into subgenero values(96, 'Indie', 5); 
insert into subgenero values(97, 'indiepop', 14); 
insert into subgenero values(98, 'indierock', 13); 
insert into subgenero values(99, 'indietronica', 8); 
insert into subgenero values(100, 'Industrial', 15); 
insert into subgenero values(101, 'industrialmetal', 18); 
insert into subgenero values(102, 'industrialrock', 7); 
insert into subgenero values(103, 'Jazz', 3); 
insert into subgenero values(104, 'jazzfunk', 11); 
insert into subgenero values(105, 'jazzfusion', 16); 
insert into subgenero values(106, 'jpop', 3); 
insert into subgenero values(107, 'Jungle', 2); 
insert into subgenero values(108, 'kpop', 1); 
insert into subgenero values(109, 'krautrock', 5); 
insert into subgenero values(110, 'Latin', 2); 
insert into subgenero values(111, 'latinjazz', 2); 
insert into subgenero values(112, 'lofi', 20); 
insert into subgenero values(113, 'mambo', 12); 
insert into subgenero values(114, 'Manouche', 17); 
insert into subgenero values(115, 'march', 8); 
insert into subgenero values(116, 'mariachi', 5); 
insert into subgenero values(117, 'mathcore', 11); 
insert into subgenero values(118, 'mathrock', 4); 
insert into subgenero values(119, 'merengue', 20); 
insert into subgenero values(120, 'Metal', 2); 
insert into subgenero values(121, 'Metalcore', 13); 
insert into subgenero values(122, 'middleeastern', 10); 
insert into subgenero values(123, 'neoclassical', 8); 
insert into subgenero values(124, 'neurofunk', 15); 
insert into subgenero values(125, 'newage', 20); 
insert into subgenero values(126, 'newwave', 1); 
insert into subgenero values(127, 'noisepop', 17); 
insert into subgenero values(128, 'noiserock', 9); 
insert into subgenero values(129, 'nujazz', 10); 
insert into subgenero values(130, 'numetal', 18); 
insert into subgenero values(131, 'opera', 18); 
insert into subgenero values(132, 'Oriental', 2); 
insert into subgenero values(133, 'Pop', 11); 
insert into subgenero values(134, 'poppunk', 16); 
insert into subgenero values(135, 'poprock', 14); 
insert into subgenero values(136, 'postgrunge', 12); 
insert into subgenero values(137, 'posthardcore', 15); 
insert into subgenero values(138, 'postmetal', 11); 
insert into subgenero values(139, 'postpunk', 2); 
insert into subgenero values(140, 'postrock', 19); 
insert into subgenero values(141, 'powermetal', 1); 
insert into subgenero values(142, 'progressivehouse', 2); 
insert into subgenero values(143, 'progressivemetal', 2); 
insert into subgenero values(144, 'progressiverock', 17); 
insert into subgenero values(145, 'Psytrance', 14); 
insert into subgenero values(146, 'Punk', 4); 
insert into subgenero values(147, 'Ragga', 3); 
insert into subgenero values(148, 'ragtime', 3); 
insert into subgenero values(149, 'rai', 4); 
insert into subgenero values(150, 'rap', 1); 
insert into subgenero values(151, 'Reggae', 12); 
insert into subgenero values(152, 'reggaeton', 12); 
insert into subgenero values(153, 'rnb', 10); 
insert into subgenero values(154, 'Rock', 6); 
insert into subgenero values(155, 'rockabilly', 9); 
insert into subgenero values(156, 'rocknroll', 10); 
insert into subgenero values(157, 'rocksteady', 6); 
insert into subgenero values(158, 'rumba', 4); 
insert into subgenero values(159, 'salsa', 2); 
insert into subgenero values(160, 'Samba', 11); 
insert into subgenero values(161, 'shoegaze', 5); 
insert into subgenero values(162, 'singersongwriter', 8); 
insert into subgenero values(163, 'Ska', 7); 
insert into subgenero values(164, 'skapunk', 9); 
insert into subgenero values(165, 'sludge', 12); 
insert into subgenero values(166, 'smoothjazz', 18); 
insert into subgenero values(167, 'Soul', 15); 
insert into subgenero values(168, 'Soundtrack', 12); 
insert into subgenero values(169, 'southernrock', 16); 
insert into subgenero values(170, 'spacerock', 10); 
insert into subgenero values(171, 'speedmetal', 14); 
insert into subgenero values(172, 'spokenword', 3); 
insert into subgenero values(173, 'stoner', 14); 
insert into subgenero values(174, 'surf', 18); 
insert into subgenero values(175, 'surfrock', 19); 
insert into subgenero values(176, 'swing', 11); 
insert into subgenero values(177, 'Symphonic', 12); 
insert into subgenero values(178, 'Synthpop', 10); 
insert into subgenero values(179, 'synthwave', 5); 
insert into subgenero values(180, 'Tango', 17); 
insert into subgenero values(181, 'Techno', 5); 
insert into subgenero values(182, 'thrashmetal', 5); 
insert into subgenero values(183, 'Trance', 19); 
insert into subgenero values(184, 'trap', 7); 
insert into subgenero values(185, 'Tribal', 13); 
insert into subgenero values(186, 'triphop', 16); 
insert into subgenero values(187, 'tropicalhouse', 9); 
insert into subgenero values(188, 'waltz', 20); 
insert into subgenero values(189, 'Western', 17); 
insert into subgenero values(190, 'World', 12); 
insert into subgenero values(191, 'zouk', 17); 



-- End of file.

