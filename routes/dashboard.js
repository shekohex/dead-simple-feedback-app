const express = require('express')
const router = express.Router()
const database = require('./../database')
const passport = require('./../passport')

router.get('/', require('connect-ensure-login').ensureLoggedIn('/'), (req, res, next) => {
    database.websiteSettings.findOne({},['-settings.adminName','-settings.passPhrase']).then(data => {
        database.feedBacks.find({},[], { sort:{
            'message.text.createdAt': -1 //Sort by Date Added DESC
        }}).then(result => {
            let unReplied = result.filter(m => {
                return m.message.reply.value === undefined ? m : false
            })
            let replied = result.filter(m => {
                return m.message.reply.value !== undefined ? m : false
            })
            res.render('dashboard', { data, feedback: result, unReplied, replied })
        }).catch(err => {
            console.log(err)
        })
    })
})
module.exports = router