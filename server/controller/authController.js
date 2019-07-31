const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res, next) => {
        const db = req.app.get("db");
        let { password, email } = req.body;

        const foundUser = await db.select_user(email)
        .catch(err => console.log(err));
        if(!foundUser.length){
            res.status(401).send('Dies irae dies illa. That user does not exist');
        } else {
            const matchPasswords = await bcrypt
            .compare(password, foundUser[0].password)
            .catch(err => console.log(err));

            if(matchPasswords){
                req.session.user = {
                    user_id: foundUser[0].user_id,
                    email: foundUser[0].email
                };
                res.status(200).send(req.session.user);
            } else{
                res.status(403).send("Woops! You played a wrong note! Incorrect password.")
            }
        };
    }, 
    register: async (req, res, next) => {
        const db = req.app.get("db");
        const { password, email, firstName, lastName, phoneNumber, school, district  } = req.body;
        db.select_user(email).then(([foundUser]) => {
            if(foundUser){
                res.status(409).send("Plagiarist! That email is already registered");
            } else{
                const saltRounds = 12;
                bcrypt.genSalt(saltRounds).then(salt => {
                    bcrypt.hash(password, salt).then(hashedPassword => {
                        db.create_user([email, hashedPassword])
                        .then(([createdUser]) => {
                            db.add_profile([firstName, lastName, phoneNumber, school, district, createdUser.user_id])
                            .then(([user]) => {
                                req.session.user = user;
                                res.status(200).send(req.session.user)
                            })
                        });
                    });
                });
            };
        });
    }, 
    logout: async (req, res, next) => {
        req.session.destroy()
        res.sendStatus(200);
    }, 
    userSession: async (req, res, next) => {
        res.status(200).send(req.session.user);
    }, 
}