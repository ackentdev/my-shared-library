select * from song_library
where user_id = $1 AND LOWER(voicing) like concat('%',$2,'%')
order by voicing asc;