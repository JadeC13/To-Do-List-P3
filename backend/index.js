// modules and globals
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require ('method-override')

mongoose.connect(process.env.MONGO_URI, {})


// Express Settings
app.set('views', __dirname + '/frontend')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//controllers and routes
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/users', require('./controllers/users') )

app.get('/', (req, res) => {
    res.render('../frontend/src/Home.js')
})


// listen for connections 
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT} :D`)
})