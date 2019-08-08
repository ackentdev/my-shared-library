select * from song_library
where user_id = $1 AND LOWER(song_name) like concat('%',$2,'%')
order by song_name asc;