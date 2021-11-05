const express = require('express');
const { DB_NAME, USER_COLLECTION } = require('../utils/constants');
const router = express.Router();
const jwtUtils = require('../utils/jwtUtil');

module.exports = (mongoClient) => {

    /**
     * interface User {
	 * id: number;
	 * username: string;
	 * password: string;
	 * email: string;
	 * role: string;
     * }
     */

    /**
     * Create user
     */
    router.post('/register', async (req, res) => {

        const { username, password, email } = req.body;
        const saltHash = jwtUtils.genPassword(password);
    
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        
        try {
            const result = await mongoClient.db(DB_NAME).collection(USER_COLLECTION)
                                    .insertOne({username, hash, salt, email, role: 'user'});
            res.status(201).json({ success: true, result });
        } catch(err) {   
            console.log(err);
        };
    });

    /**
     * Login user
     */
    router.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await mongoClient.db(DB_NAME).collection(USER_COLLECTION)
                                .findOne({username: username});
            if (!user) { return res.status(401).json({ success: false, msg: "Could not find user." }); }
            let isValid = false;
            if(user) {
                isValid = jwtUtils.validPassword(password, user.hash, user.salt);
            }
            
            if (isValid) {
                const tokenObject = jwtUtils.issueJWT(user);
                return res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            } else {
                return res.status(401).json({ success: false, msg: "You entered the wrong password." });
            }
        } catch(err) {   
            return res.status(500).json({ success: false, msg: err.message });
        };
    });

    return router;
}