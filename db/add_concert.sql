insert into concerts(user_id, concert_name, date, song_id)
values($1, $2, $3, $4);

select c.concert_id, c.concert_name, c.date, sl.song_name, sl.catalog_id from concerts c
join song_library sl
on (sl.song_id = c.song_id)
where c.user_id = $1;