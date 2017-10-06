const express = require('express')
const router = express.Router()
const database = require('./../database')

/* GET home page. */
router.get('/', (req, res) => {
    let data = null
    database.websiteSettings.findOne({}).then(result => {
        data = result
    })
    database.feedBacks.find({}).then(result => {
        res.render('index', { data, feedback: result })
    }).catch(err => {
        console.log(err)
    })

})

module.exports = router
