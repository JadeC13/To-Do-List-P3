const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
const jwt = require('jsonwebtoken');

// Login
router.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await db.Users.findOne({ email });
        if (!user) {
            console.log(email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(password);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If password is correct, generate a JWT token
        const token = jwt.sign(
            { userId: user._id }, // Payload: user ID
            'theSecretKey',      // Secret key
            { expiresIn: '1h' }   // Token expiry time
        );

        // Send the token to the client
        res.status(200).json({ token });
        
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//Sign up
router.post('/Signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Save the hashed password in the `password` field
        const newUser = new db.Users({ firstName, lastName, email, password: hashedPassword });
        
        await newUser.save();
        res.status(201).send('User Registered');
        
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