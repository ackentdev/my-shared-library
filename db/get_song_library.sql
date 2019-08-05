select * from song_library
join users on users.user_id = song_library.user_id
where users.user_id = $1; 