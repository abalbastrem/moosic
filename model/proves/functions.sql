CREATE OR REPLACE FUNCTION insertTagAndTrack() RETURNS trigger AS $$
BEGIN
	insert into tracks values (NEW.id, NEW.name, NEW.artist_id, NEW.artist_name, NEW.album_image, NEW.audio, NEW.audiodownload, NEW.image, NEW.album_name, NEW.shorturl);
	RETURN NEW;
	END
	$$LANGUAGE plpgsql;





	CREATE TRIGGER insert_tag_track
	  BEFORE INSERT
	  ON tracks
	  FOR EACH ROW
	  EXECUTE PROCEDURE insertTagAndTrack();