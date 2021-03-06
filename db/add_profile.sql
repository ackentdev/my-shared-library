insert into profile(first_name, last_name, phone, school, district, user_id)
values($1, $2, $3, $4, $5, $6);

select users.user_id, first_name, last_name, email, phone, school, district, picture from users
join profile
on (users.user_id = profile.user_id)
where users.user_id = $6;
