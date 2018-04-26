-- creamos una funcion que nos regrese un valor entre la cantidad de tags
CREATE OR REPLACE FUNCTION random_between(low INT ,high INT) 
   RETURNS INT AS $$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END; $$LANGUAGE plpgsql;

-- View de playlist dependiendo del mood
CREATE OR REPLACE FUNCTION creaview_playlist_mood() RETURNS void AS $$
-- Si el usuario ha votado que le gusta un mood
DECLARE
v_cantidad bigint;
BEGIN
select ps.tracks_id, pl.users_id, lm.nombre as mood from playlist_songs ps join playlist pl on pl.id = ps.playlist_id join moods md on md.id_track = ps.tracks_id join leyenda_mood lm on lm.id = md.id_leyenda_mood where pl.users_id in (select id_user from votos_moods where md.id = id_moods and pl.users_id = id_user and vote='like');
IF NOT FOUND THEN

	RAISE NOTICE 'usuario sin votos en mood';
ELSE
	RAISE NOTICE 'usuario con votos en Mood'
	create or replace view playlist_mood as select ps.tracks_id, pl.users_id, lm.nombre as mood from playlist_songs ps join playlist pl on pl.id = ps.playlist_id join moods md on md.id_track = ps.tracks_id join leyenda_mood lm on lm.id = md.id_leyenda_mood where pl.users_id in (select id_user from votos_moods where md.id = id_moods and pl.users_id = id_user and vote='like');
END IF;
RAISE NOTICE 'view playlist_mood creada';
END;
$$LANGUAGE plpgsql;
