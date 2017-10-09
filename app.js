const express = require('express')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const path = require('path')
const dotenv = require('dotenv')
const helmet = require('helmet')
const compression = require('compression')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('./passport')

let index = require('./routes/index')
let feedback = require('./routes/feedback')
let manager = require('./routes/manager')
let dashboard = require('./routes/dashboard')

const app = express()
dotenv.config()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(helmet())
app.use(compression())
app.use(logger('dev'))
//we will use this for store msg id to get reply quickly
app.use(session({
    name: 'cookie-id',
    secret: process.env.MY_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new fileStore()
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

/*
deactivate this route after finish your setup
app.get('/setup', (req, res) => {
   let settings = new database.websiteSettings({
       settings: {
           title: 'Give Me a Feedback'
       },
       userData: {
           username: 'shadygkhalifa',
           name: 'Shady Khalifa',
           profilePic: 'https://pbs.twimg.com/profile_images/915263274110906369/Z_kfjrLb_400x400.jpg',
           headerPic: 'https://pbs.twimg.com/profile_banners/2943447525/1482352613/1500x500',
           facebook: 'https://facebook.com/hex.inc',
           twitter: 'https://twitter.com/shadygkhalifa',
           github: 'https://github.com/shekohex'
       },
       senderData: {
           name: 'Someone',
           username: 'someone',
           profilePic: 'images/unknown.jpg'
       }
   })
    settings.save()
    res.send(settings)
})
*/

//routes
app.use('/', index)
app.use('/feedback', feedback)
app.use('/manager', manager)
app.use('/dashboard', dashboard)
module.exports = app
