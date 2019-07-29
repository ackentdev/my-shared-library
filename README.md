# **My Shared Library**
## ***DATABASE***

- Users
```sql
create table users(
user_id serial primary key,
email text not null,
password text not null
);
```

- Profile
```sql
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
```

- Song_Library
```sql
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
concert_id integer references concerts(concert_id),
user_id integer references users(user_id)
);
```

- Ensembles
```sql
create table ensembles(
    ensemble_id serial primary key,
    ensemble_name text,
    user_id integer references users(user_id)
);
```

- Concerts
```sql
create table concerts(
    concert_id serial primary key,
    ensemble_name text,
    date varchar(10),
    user_id integer references users(user_id)
);
```
## ***SERVER***

### dependencies
- express
- massive
- dotenv
- express-session
- bcrypt

### server file structure
- server/
    - index.js
    - middlewares
        - middleware.js
    - controller
        - authController.js
        - libraryController.js
        - profileController.js

### ENDPOINTS
***auth***
- login: => /api/login
- logout: => /api/logout
- register: => /api/register
- userSession: => /api/user_session

***library***
- getUserLibrary: => /api/library
- getSearchResults: => /api/library/?=
- addSong: => /api/library
- deleteSong: => /api/library/:id
- updateSong: => /api/library/:id

***profile***
- getUserInfo: =>/api/user_info
- updateConcerts: => /api/concerts/:id
- addConcert: => /api/concerts
- updateEnsembles: => /api/ensembles
- deleteConcert: => /api/concer/:id

## ***CLIENT***

### *dependencies*
- axios
- react-router-dom (BrowserRouter)
- redux
- react-redux
- node-sass
- react-icons/fa
- http-proxy-middleware
- redux-promise-middleware

### *routes*
- home => / => login
- profile => /profile => Profile.js
- MyLibrary =>/library => Library.js
- search => /library/search => Search.js
- results => /library/search/results => Results.js
- AddSong => /library/add => AddSong.js
- SongInfo => /library/song_info
- Concerts => /concerts => Concerts.js

### *file-structure*
- src/
    - components/
        - Login
            - Login.js
            - Login.scss
        - Library
            - Library.js
            - Library.scss
        - Search
            - Search.js
            - Search.scss
        - Results
            - Results.js
            - Results.scss
        - AddSong
            - AddSong.js
            - AddSong.scss
        - SongInfo
            - SongInfo.js
            - SongInfo.scss
        - Profile
            - Profile.js
            - Profile.scss
        - Concerts
            - Concerts.js
            - Concerts.scss 
    - App.js
    - App.css
    - reset.css
    - index.js
    - redux
        - store.js
        - reducer.js
    - setupProxy.js        