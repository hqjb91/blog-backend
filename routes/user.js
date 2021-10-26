const express = require('express');
const router = express.Router();

module.exports = () => {

    /**
     * interface User {
	 * id: number;
	 * username: string;
	 * password: string;
	 * email: string;
	 * role: string;
     * }
     */

    const users = [];

    /**
     * Create user
     */
    router.post('/register', async (req, res) => {

    });

    /**
     * Login user
     */
    router.post('/login', async (req, res) => {

    });

    return router;
}