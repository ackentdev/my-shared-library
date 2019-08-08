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
    },
    search: async (req, res, next) => {
        const db = req.app.get("db");
        let {user_id} = req.params;
        let {searchColumn, typedSearch} = req.body;
        if(searchColumn === "song_name"){
            const resultsTitle =  await db.search_library_name([user_id, typedSearch])
            res.status(200).send(resultsTitle);
        } else if(searchColumn === "composer"){
            const resultsComposer = await db.search_library_composer([user_id, typedSearch])
            res.status(200).send(resultsComposer)
        } else if(searchColumn === "voicing"){
            const resultsVoicing = await db.search_library_voicing([user_id, typedSearch])
            res.status(200).send(resultsVoicing)
        } else if(searchColumn === "genre"){
            const resultsGenre = await db.search_library_genre([user_id, typedSearch])
            res.status(200).send(resultsGenre)
        };
    },
    deleteSong: async (req, res, next) => {
        const db = req.app.get("db");
        let {user_id, song_id} = req.query;
        const deletedSong = await db.delete_song([song_id, user_id])
        res.status(200).send(deletedSong)
    }
}