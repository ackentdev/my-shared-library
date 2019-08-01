module.exports = {

    updateProfileInfo: (req, res, next) => {

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

    }
}