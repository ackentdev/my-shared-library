require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const app = express();
const { login, register, userSession, logout } = require('./controller/authController');
const { updateProfileInfo, getProfileInfo, deleteProfile } = require('./controller/profileController');
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

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

// app.put('/api/profile', updateProfileInfo);
app.get('/api/profile', getProfileInfo);
// app.delete('/api/profile', deleteProfile);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}🎵`))