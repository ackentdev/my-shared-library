module.exports = {

    updateProfileInfo: (req, res, next) => {
        const db = req.app.get("db");
        const {user_id} = req.params;
        const {editfirstName, editlastName, editphoneNumber, editschool, editdistrict, editemail} = req.body;
        db.edit_profile([user_id, editfirstName, editlastName, editemail, editphoneNumber, editschool, editdistrict])
        .then(([user]) => {
            req.session.user = user;
            res.status(200).send(req.session.user);
        })
        .catch(err => console.log(err));
    },
    getProfileInfo: (req, res, next) => {
        const db = req.app.get("db");
        db.get_profile([req.body.user_id])
        .then(([user]) => {
            req.session.user = user;
            res.status(200).send(req.session.user);
        })
    },
    deleteProfile: (req, res, next) => {

    },
    getConcerts: async(req, res, next) => {
        const db = req.app.get("db");
        const concerts = await db.get_concerts([req.params.user_id]).catch(err => console.log(err))
        res.status(200).send(concerts);
    },
    addConcert: async(req, res, next) => {
        const db = req.app.get("db");
        const {user_id} = req.params;
        const {concert_name, date, song_id} = req.body;
        console.log(`added ${song_id} to concert ${concert_name}`)
        const addedConcert = await db.add_concert([user_id, concert_name, date, song_id]).catch(err => console.log(err))
        res.status(200).send(addedConcert);
    }
}