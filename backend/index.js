// modules and globals
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const methodOverride = require ('method-override')
const app = express()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})


// Express Settings
app.set('views', __dirname + '/frontend')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.json());


//controllers and routes
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/users', require('./controllers/users'));

app.get('/', (req, res) => {
    res.render('../frontend/src/Home.js')
})

// Define a User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
    res.header('auth-token', token).send('Logged in successfully');
});

// Protected route
app.get('/profile', verifyToken, (req, res) => {
    res.send(`Welcome User: ${req.user._id}`);
});

// Token verification middleware
function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.user = verified;
    next();
        } catch (err) {
    res.status(400).send('Invalid Token');
    }
}

// app.get('*', (req, res) => {
//     res.status(404).send('<h1>404 Page</h1>')
// })

// listen for connections 
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT} :D`)
})