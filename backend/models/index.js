require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {})

module.exports.Users = require('./users')
module.exports.Task = require('./tasks')
