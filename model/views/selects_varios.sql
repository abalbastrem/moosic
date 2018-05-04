-- -- creamos una funcion que nos regrese un valor entre la cantidad de tags
-- CREATE OR REPLACE FUNCTION random_between(low INT ,high INT) 
--    RETURNS INT AS $$
-- BEGIN
--    RETURN floor(random()* (high-low + 1) + low);
-- END; $$LANGUAGE plpgsql;

-- -- View de playlist dependiendo del mood
-- CREATE OR REPLACE FUNCTION creaview_playlist_mood() RETURNS void AS $$
-- -- Si el usuario ha votado que le gusta un mood
-- DECLARE
-- v_cantidad bigint;
-- BEGIN
-- select ps.tracks_id, pl.users_id, lm.nombre as mood from playlist_songs ps join playlist pl on pl.id = ps.playlist_id join moods md on md.id_track = ps.tracks_id join leyenda_mood lm on lm.id = md.id_leyenda_mood where pl.users_id in (select id_user from votos_moods where md.id = id_moods and pl.users_id = id_user and vote='like');
-- IF NOT FOUND THEN

-- 	RAISE NOTICE 'usuario sin votos en mood';
-- ELSE
-- 	RAISE NOTICE 'usuario con votos en Mood'
-- 	create or replace view playlist_mood as select ps.tracks_id, pl.users_id, lm.nombre as mood from playlist_songs ps join playlist pl on pl.id = ps.playlist_id join moods md on md.id_track = ps.tracks_id join leyenda_mood lm on lm.id = md.id_leyenda_mood where pl.users_id in (select id_user from votos_moods where md.id = id_moods and pl.users_id = id_user and vote='like');
-- END IF;
-- RAISE NOTICE 'view playlist_mood creada';
-- END;
-- $$LANGUAGE plpgsql;



-- obtenemos las canciones, las cuales los usuarios han votado a un mood tabla regresa(id_track, mood, id_mood, id_user)
select moods.id_track, leyenda_mood.nombre, votos_moods.id_moods, votos_moods.id_user from votos_moods join moods on votos_moods.id_moods = moods.id join leyenda_mood on moods.id_leyenda_mood = leyenda_mood.id where votos_moods.vote = 'like';


-- obtener una tabla que tenga, cancion, mood, votos positivos, votos negativos 
create view moods_general as select tabla_like.id_track, tabla_like.id_moods, tabla_like.nombre, tabla_like.votos_like, tabla_dislike.votos_dislike from (select id_moods,leyenda_mood.nombre, moods.id_track, count(vote) as votos_like from votos_moods join moods on moods.id = votos_moods.id_moods join leyenda_mood on leyenda_mood.id = moods.id_leyenda_mood group by id_moods, vote, moods.id_track, leyenda_mood.nombre having vote = 'like' order by votos_like DESC) as tabla_like join (select id_moods,leyenda_mood.nombre, moods.id_track, count(vote) as votos_dislike from votos_moods join moods on moods.id = votos_moods.id_moods join leyenda_mood on leyenda_mood.id = moods.id_leyenda_mood group by id_moods, vote, moods.id_track, leyenda_mood.nombre having vote = 'zero' order by votos_dislike DESC) as tabla_dislike on tabla_like.id_track = tabla_dislike.id_track;


-- crear un reset para albert (delete from de todo)




-- crear select que busque que x cancion con y tag 

cliente pide cancion por id_track
buscar la cancion y los tags que tengan menos de 5 votos negativo / positivo

regresar id_cancion y tag que tenga menos de 5 votos por alguno de los lados 

regresar el tag que menos votos tenga
tener menos de x votos y el que menos limit 1 order by desc


LIKES:

select votos_tag.id_tags, leyenda_tags.nombre, count(*) as likes from tags join votos_tag on votos_tag.id_tags = tags.id join leyenda_tags on leyenda_tags.id = tags.id_leyenda_tag where vote = 'like' group by votos_tag.id_tags, leyenda_tags.nombre;


DISLIKES:

select votos_tag.id_tags, leyenda_tags.nombre, count(*) as dislikes from tags join votos_tag on votos_tag.id_tags = tags.id join leyenda_tags on leyenda_tags.id = tags.id_leyenda_tag where vote = 'dislike' group by votos_tag.id_tags, leyenda_tags.nombre;

ZERO:

select votos_tag.id_tags, leyenda_tags.nombre, count(*) as zero from tags join votos_tag on votos_tag.id_tags = tags.id join leyenda_tags on leyenda_tags.id = tags.id_leyenda_tag where vote = 'zero' group by votos_tag.id_tags, leyenda_tags.nombre;





consulta final:

select votos_tag.id_tags, leyenda_tags.nombre, count(*) as likes from tags join votos_tag on votos_tag.id_tags = tags.id join leyenda_tags on leyenda_tags.id = tags.id_leyenda_tag where vote = 'like' group by votos_tag.id_tags, leyenda_tags.nombre having count(*) < 5 union select votos_tag.id_tags, leyenda_tags.nombre, count(*) as dislikes from tags join votos_tag on votos_tag.id_tags = tags.id join leyenda_tags on leyenda_tags.id = tags.id_leyenda_tag where vote = 'dislike' group by votos_tag.id_tags, leyenda_tags.nombre having count(*) < 5 union select votos_tag.id_tags, leyenda_tags.nombre, count(*) as zero from tags join votos_tag on votos_tag.id_tags = tags.id join leyenda_tags on leyenda_tags.id = tags.id_leyenda_tag where vote = 'zero' group by votos_tag.id_tags, leyenda_tags.nombre having count(*) < 5;












-- voto de los tags

cuando el user vota un tag, hacer insert or update en tabla x donde se relacione id_usuario, id_track, 
id_tag, fecha actual, positivo negativo neutro

insert into votos_tag values(1, 'like', now(), 2) ON CONFLICT (id_tags, id_users) DO UPDATE SET vote = excluded.vote; 




S






-- jordi pide playlist de usuario
albert volver canciones de playlist de usuario

select tracks.* from playlist_songs join playlist on playlist_songs.playlist_id = playlist.id join tracks on playlist_songs.tracks_id = tracks.id where users_id = 2;

-- nos vuelve la lista de las canciones con toda la información








-- meter cancion a playlist // USUARIO SOLO TIENE UNA PLAYLIST
datos: id_user, id_track

insert into playlist_songs (playlist_id, tracks_id) select playlist_id, 1279446 from playlist_songs join playlist on playlist_songs.playlist_id = playlist.id where playlist.users_id = 2;

-- cambiar 1279446 por track_id y 2 por user_id











-- eliminar cancion a playlist // USUARIO SOLO TIENE UNA PLAYLIST
datos: id_user, id_track


DELETE FROM playlist_songs where tracks_id = 1279446 and playlist_id = (select playlist_id from playlist_songs join playlist on playlist_songs.playlist_id = playlist.id where playlist.users_id = 2 limit 1);

-- cambiar 1279446 por track_id y 2 por user_id // considerando QUE SOLO TIENE UNA PLAYLIST CADA USUARIO

delete from playlist_songs where playlist_id = (select playlist.id from playlist where users_id = 66) and tracks_id = 10632;
	






-- votar moods:

datos: id_user, id_track, mood -> positivo o neutro (insert or update)

-- credenciales de usuario
INSERT



SELECT -> username-email, password


SELECT * FROM users WHERE (username like 'JulRui80' or email like 'JulRui80@gmail.com') and password = md5('julrui80');



delete

delete from users where email ='AlaRiv93@gmail.com' and username = 'AlaRiv93' and id = 66;



-----------------------------------------------------


	logica albert
	pregunta si el usuario X le falta por votar algun tag de la cancion X


	regresar el tag que no ha votado


	el tag que ha votado:
	select tags.* from votos_tag join tags on votos_tag.id_tags = tags.id join users on users.id = votos_tag.id_users where users.id=72;

	los tags que no ha votado 
	select * from tags join leyenda_tags on tags.id_leyenda_tag = leyenda_tags.id where id_track = 1344752 and tags.id not in(select tags.id from votos_tag join tags on votos_tag.id_tags = tags.id join users on users.id = votos_tag.id_users where users.id=72);


-- tags de la cancion 1344749 con cantidad de votos 
SELECT tags.id, leyenda_tags.nombre, count(*) as votos from votos_tag join tags on votos_tag.id_tags = tags.id join tracks on tags.id_track = tracks.id join leyenda_tags on leyenda_tags.id = tags.id_leyenda_tag where tracks.id = 1344749 group by tags.id, leyenda_tags.nombre having count(*) < 5 order by votos ASC;

-- canciones que ha votado el usuario

SELECT votos_tag.* as votos from votos_tag join tags on votos_tag.id_tags = tags.id join tracks on tags.id_track = tracks.id where tracks.id = 1344749 and votos_tag.id_users = 66;

consulta final:

SELECT tags.id, leyenda_tags.nombre, count(*) as votos from votos_tag join tags on votos_tag.id_tags = tags.id join tracks on tags.id_track = tracks.id join leyenda_tags on leyenda_tags.id = tags.id_leyenda_tag where tracks.id = 1344749 and votos_tag.id_tags not in (SELECT votos_tag.id_tags as votos from votos_tag join tags on votos_tag.id_tags = tags.id join tracks on tags.id_track = tracks.id where tracks.id = 1344749 and votos_tag.id_users = 66) group by tags.id, leyenda_tags.nombre having count(*) < 5 order by votos ASC;




1344749


ordenar las canciones que menos votos han tenido
regresar el menos votado que el usuario no haya votado

consulta final, para mostrar formato de datos deseado: regresa un array ordenado
de menor a mayor tags por cantidad de votos, los cuales el usuario X no ha votado aun de esa canción


select array_agg(nombre) from (SELECT tags.id, leyenda_tags.nombre, count(*) as votos from votos_tag join tags on votos_tag.id_tags = tags.id join tracks on tags.id_track = tracks.id join leyenda_tags on leyenda_tags.id = tags.id_leyenda_tag where tracks.id = 1344749 and votos_tag.id_tags not in (SELECT votos_tag.id_tags as votos from votos_tag join tags on votos_tag.id_tags = tags.id join tracks on tags.id_track = tracks.id where tracks.id = 1344749 and votos_tag.id_users = 66) group by tags.id, leyenda_tags.nombre having count(*) < 5 order by votos ASC) as result;


-------------------------------------------
funcion prueba:



create or replace function demo(integer) returns integer as $$
declare
resultado integer;
begin
select into strict resultado $1*2;
return resultado;
end;
$$language plpgsql;



---------------------------------------

insert para vote:
	albert me da: id_track
					id_user
					tag(nombre ej = 'rock');
					voto

con esto obtengo el id del tag de la canción X que tiene su tag de rock

select tags.id from tags join leyenda_tags on tags.id_leyenda_tag = tags.id where leyenda_tags.nombre='Rock' and id_track = 1482417;


final:
insert into votos_tag (id_tags, vote, id_users) select * from (select tags.id, CAST('like' AS VOTE) as vote, CAST('66' AS INTEGER) as id_user from tags join leyenda_tags on tags.id_leyenda_tag = tags.id where leyenda_tags.nombre='Rock' and id_track = 1482417) as result ON CONFLICT (id_tags, id_users) DO UPDATE SET vote = excluded.vote;
