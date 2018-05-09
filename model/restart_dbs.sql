\c moosic_final
delete from genre;
alter sequence genre_id_seq restart 1;
delete from leyenda_mood;
alter sequence leyenda_mood_id_seq restart 1;
delete from leyenda_tags;
alter sequence leyenda_tags_id_seq restart 1;
delete from moods;
alter sequence moods_id_seq restart 1;
delete from playlist;
alter sequence playlist_id_seq restart 1;
delete from playlist_song;
delete from tags;
alter sequence tags_id_seq restart 1;
delete from tracks;
delete from users;
alter sequence users_id_seq restart 1;
delete from votos_moods;
delete from votos_tag;
