select song_name, composer, catalog_id, song_id from song_library
where song_id = $1;