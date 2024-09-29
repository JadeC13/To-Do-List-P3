// modules and globals
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const methodOverride = require ('method-override')
const app = express()
const defineCurrentUser = require('./middleware/defineCurrentUser')
const path = require('path')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})


// Express Settings
app.set('views', __dirname + '/frontend')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(defineCurrentUser)
app.use(cors())
// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
}


app.use(express.json());


//controllers and routes
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/users', require('./controllers/users'))
app.use('/authentication', require('./controllers/authentication'))

app.get('/', (req, res) => {
    res.render('../frontend/src/Home.js')
})

// listen for connections 
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT} :D`)
})