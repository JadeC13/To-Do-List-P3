const router = require('express').Router()
const db = require('../models')

router.post('/Login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    db.Users.create(req.body)
        .then(() => {
            res.redirect('/Home');
        })
        .catch((error) => {
            console.error('Database error:', error); // Log the error to the console
            res.status(500).json({ message: 'Internal Server Error' }); // Send an error response to the client
        });
});

module.exports = router;