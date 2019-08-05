module.exports = {
    addSong: (req, res, next) => {
        const db = req.app.get("db");
        let { title, voicing, genre, catalogID, composer, publisher, publisherID, accompaniment, notes, user_id} = req.body;

        db.add_song([title, voicing, genre, catalogID, composer, publisher, publisherID, accompaniment, notes, user_id])
        .then(() => {
            console.log("Song successfully added!");
            res.status(200).send("Song successfuly added!");
        })
        .catch(err => console.log(err));
    },
    getLibrary: (req, res, next) => {
        const db = req.app.get("db");
        let { user_id } = req.params;

        db.get_song_library([user_id])
        .then((library) => {
            res.status(200).send(library)
        })
        .catch(err => console.log(err));
    }
}