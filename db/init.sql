drop table if exists profile;
drop table if exists concerts;
drop table if exists song_library;
drop table if exists ensembles;
drop table if exists users;

-- create tables
create table users(
user_id serial primary key,
email text not null,
password text not null
);

create table profile(
profile_id serial primary key,
picture text default 'https://res.cloudinary.com/akentdev/image/upload/v1564421115/Default-Profile_odqsk3.jpg',
first_name text,
last_name text,
phone varchar(14),
school text,
district text,
user_id integer references users(user_id)
);

create table ensembles(
    ensemble_id serial primary key,
    ensemble_name text,
    user_id integer references users(user_id)
);

create table song_library(
song_id serial primary key,
song_name text not null,
voicing text,
genre text,
catalog_id integer,
composer text,
publisher text,
publisher_id text,
accompaniment text,
notes text,
user_id integer references users(user_id)
);

create table concerts(
    concert_id serial primary key,
    concert_name text,
    date varchar(10),
    user_id integer references users(user_id),
    song_id integer references song_library(song_id)
);

-- Create dummy data
insert into users(email, password)
values
('ackent@mpsaz.org', 'test'),
('test@test.edu', 'test');

insert into profile(first_name, last_name, phone, school, district, user_id)
values('Adam', 'Kent', '(480)-461-0848', 'Dobson High School', 'Mesa Public Schools', 1),
('Test', 'McTest', '(123)-456-7890', 'Test Junior High', 'Test United School District', 2);

insert into ensembles(ensemble_name, user_id)
values('Bella Voce', 1),
('Mens Choir', 1), ('Divae Cantates', 1), ('Cantus', 1), ('Da Capo', 1), ('Test Osterones', 2), ('Testaliers', 2), ('Testinos', 2);

insert into song_library(song_name, voicing, genre, catalog_id, composer, publisher, publisher_id, accompaniment, notes, user_id)
values('Tomorrow Shall Be My Dancing Day', 'SATB', 'Christmas', '12345', 'R. Holder', 'Boosey Hawkes', 'JP59732D', 'Piano', 'challenging rhythm', 1),('Happy Birthday', 'SSA', 'Folk', '12346', 'E. Copley', 'Hal Leonard', 'HL4568Y', 'Flute', 'crowd pleaser', 1), ('Barso Re', 'SSAATTBB', 'Multicultural', '12347', 'D. Bender', 'World Press', 'WP6969AA', 'Tablas, Tambourine', 'closer', 1), ('Happy Birthday', 'SSA', 'Folk', '12346', 'E. Copley', 'Hal Leonard', 'HL4568Y', 'Flute', 'crowd pleaser', 2);

insert into concerts(concert_name, date, user_id, song_id)
values('Fall Concert', '10/08/2017', 1, 1), ('Fall Concert', '10/08/2017', 1, 2), ('Fall Concert', '10/08/2017', 1, 3), ('Holiday Concert', '12/06/2017', 1, 2), ('Holiday Concert', '12/06/2017', 1, 1), ('Test Night', '69/69/1969', 2, 2);

-- Select total user library
select * from users
join song_library
on (song_library.user_id = users.user_id);