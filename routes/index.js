const express = require('express')
const router = express.Router()
const database = require('./../database')

/* GET home page. */
router.get('/', (req, res) => {
    database.websiteSettings.findOne({}).then(data => {
        database.feedBacks.find({
            'message.reply.value': { $exists: true }
        },[], { sort:{
            'message.text.createdAt': -1 //Sort by Date Added DESC
        }}).then(result => {
            res.render('index', { data, feedback: result, lastMessage: req.session.lastMessage})
        }).catch(err => {
            console.log(err)
        })
    })
})

module.exports = router
