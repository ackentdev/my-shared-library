require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const app = express();
const { login, register, userSession, logout } = require('./controller/authController');
const { updateProfileInfo, getProfileInfo, getConcerts, addConcert } = require('./controller/profileController');
const { addSong, getLibrary, search, deleteSong } = require('./controller/libraryController')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;
app.use( express.static( `${__dirname}/../build` ) );

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    console.log('connected to db');
    app.set('db', db)
});

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14,
    }
})
);

app.post('/api/login', login);
app.post('/api/register', register);
app.get('/api/userSession', userSession);
app.get('/api/logout', logout);

app.put('/api/profile/:user_id', updateProfileInfo);
app.get('/api/profile/:user_id', getProfileInfo);
// app.delete('/api/profile', deleteProfile);

app.post('/api/library', addSong);
app.get('/api/library/:user_id', getLibrary);
app.post('/api/library/search/:user_id', search);
app.delete('/api/library', deleteSong)

app.get('/api/profile/concerts/:user_id', getConcerts)
app.post('/api/profile/concerts/:user_id', addConcert)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}🎵`))
const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})