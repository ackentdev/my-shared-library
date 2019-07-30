insert into users(email, password)
values ($1, $2);

select user_id, email from users
where email = $1;