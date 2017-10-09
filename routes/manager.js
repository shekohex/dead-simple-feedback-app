const express = require('express')
const router = express.Router()
const database = require('./../database')
const passport = require('./../passport')
/* GET */
router.get('/login', (req, res, next) => {
    database.websiteSettings.findOne({},['-settings.adminName','-settings.passPhrase']).then(data => {
        res.render('manager', { data })
    })
})
router.post('/login', passport.authenticate('local', { successRedirect: '/dashboard',failureRedirect: 'loginfail'}), (req, res) => {
        res.sendStatus(200)
})
router.get('/loginfail', (req, res) =>{
    res.sendStatus(401)
})
router.get('/logout', (req, res) =>{
        req.logout()
        res.redirect('/')
})
router.get('/', require('connect-ensure-login').ensureLoggedIn('/'), (req, res, next) => {
    res.redirect('/dashboard')
})
module.exports = router