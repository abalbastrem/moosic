-- 7 dias antes
-- y si estan validadas TRUE OR FALSE (que tenga tags < 5 votos)


-- ...
-- volver

-- * from tracks



-- {tracks:[{track1},
-- 	 {track2},
-- ]}





-- ------------------------------------+



-- idtrack | validada T F



-- no tiene que salir la cancion 1355745

-- select distinct(id_track), count(votos_tag.*) from votos_tag join tags on id_tags = id group by votos_tag.id_tags, tags.id_track having count(*) < 6;


--  SELECT tracks.id, age(dumpdate) < INTERVAL '7 day' AS validada from tracks join tags on tags.id_track = tracks.id join votos_tag on votos_tag.id_tags = tags.id group by tracks.id having count(votos_tag.*) < 6;



create view baby_tracks as select distinct(id_track), age(tracks.dumpdate) < INTERVAL '7 day' AS validada from votos_tag join tags on id_tags = id join tracks on tags.id_track = tracks.id group by votos_tag.id_tags, tags.id_track, validada having count(*) < 6;

