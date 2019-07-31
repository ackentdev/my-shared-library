insert into users(email, password)
values ($1, $2);

select user_id from users
where email = $1;