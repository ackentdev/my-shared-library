update profile
set first_name = $2, last_name = $3, phone = $5, school = $6, district = $7
where profile.user_id = $1;

update users
set email = $4
where users.user_id = $1;

select users.user_id, first_name, last_name, email, phone, school, district, picture from users
join profile
on (users.user_id = profile.user_id)
where users.user_id = $1;