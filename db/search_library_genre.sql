select * from song_library
where user_id = $1 AND LOWER(genre) like concat('%',$2,'%')
order by genre asc;