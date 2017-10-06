const express = require('express')
const database = require('./database')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')

let index = require('./routes/index')
let feedback = require('./routes/feedback')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(helmet())
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/feedback', feedback)
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
// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
