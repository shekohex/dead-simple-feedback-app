const mongoose = require('mongoose')
const feedback = require('./models/feedbacks')
const settings = require('./models/settings')
let config = {
    dbUsername: 'shekohex',
    dbPassword: '123456',
    dbServer: 'ds147534.mlab.com',
    dbPort:'47534',
    dbName:'feed-back'
}
const dbUrl = `mongodb://${config.dbUsername}:${config.dbPassword}@${config.dbServer}:${config.dbPort}/${config.dbName}`
//Set up default mongoose connection
mongoose.connect(dbUrl, {
    useMongoClient: true
})

//Get the default connection
mongoose.Promise = global.Promise
const db = mongoose.connection
const feedBacks = mongoose.model('feedbacks', feedback)
const websiteSettings = mongoose.model('settings', settings)
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.on('connected', () => {
    console.log('Connected to Database')
})
module.exports = {
    db, feedBacks, websiteSettings
}