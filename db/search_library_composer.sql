select * from song_library
where user_id = $1 AND LOWER(composer) like concat('%',$2,'%')
order by composer asc;