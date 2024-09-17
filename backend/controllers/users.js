const router = require('express').Router()
const db = require('../models')

const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

//Login
router.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await db.Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.redirect('/Home');
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Sign up
router.post('/Signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new db.Users({ email, password: hashedPassword });
        await newUser.save();

        res.redirect('/Home');
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const users = await db.Users.find({}, 'email');
        res.status(200).json(users);
    } catch (error) {
        console.error('error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Test
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Route is working' });
});

module.exports = router;

// router.post('/Login', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     db.Users.create(req.body)
//         .then(() => {
//             res.redirect('/Home');
//         })
//         .catch((error) => {
//             console.error('Database error:', error); // Log the error to the console
//             res.status(500).json({ message: 'Internal Server Error' }); // Send an error response to the client
//         });
// });
