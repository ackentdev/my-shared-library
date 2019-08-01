select users.user_id, first_name, last_name, email, phone, school, district, picture, password from users
join profile
on (users.user_id = profile.user_id)
where users.email = $1;