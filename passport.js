const passport = require('passport')
const Strategy = require('passport-local').Strategy
const  database = require('./database')

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy((username, password, cb) => {
    database.websiteSettings.findOne({'settings.adminName': username}, (err, user) => {
        if(err) return cb(err)
        if(!user) return cb(null, false, { message: 'Incorrect username.' })
        if (user.settings.passPhrase !== password) return cb(null, false, { message: 'Incorrect password.' })
        return cb(null, user)
    })
}))
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
    cb(null, user._id)
});

passport.deserializeUser((id, cb) => {
    database.websiteSettings.findById(id, (err, user) => {
        if(err) return cb(err)
        cb(null, user)
    })
})
module.exports = passport