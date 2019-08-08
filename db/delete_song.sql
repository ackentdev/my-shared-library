delete from song_library where song_id = $1;

select * from song_library where user_id = $2;