const express = require('express')
const router = express.Router()
const database = require('./../database')
/* GET */
router.get('/', (req, res, next) => {
  res.send('i think there is nothing here !')
})
router.post('/add', (req, res, next) => {
    if (req.body.message === null) {
        res.status(400).json({
            status: false,
            message: 'message is null'
        })
    } else if (req.body.message.length >= 1500) {
        res.status(400).json({
            status: false,
            message: 'message is too long'
        })
    } else {
        let feedback = new database.feedBacks({
            message: {
                text: {
                    value: req.body.message
                }
            }
        })
        feedback.save()
        req.session.lastMessage = feedback._id
      res.status(200).json({
          status: true,
          message: feedback
      })
    }
})
router.post('/reply', require('connect-ensure-login').ensureLoggedIn('/'), (req, res, next) => {
    if (req.body.reply === null) {
        res.status(400).json({
            status: false,
            message: 'reply is null'
        })
    } else if (req.body.reply.length >= 1500) {
        res.status(400).json({
            status: false,
            message: 'reply is too long'
        })
    } else {
       let feedback = database.feedBacks
          feedback.findOneAndUpdate({ '_id': req.body.id },
            {
                $set: {
                        'message.reply.value': req.body.reply,
                        'message.reply.createdAt': Date.now()
                }
            }, { new: true }).then(result => {
              res.status(200).json({
                  status: true,
                  message: result
              })
          })
    }
})
router.post('/delete', require('connect-ensure-login').ensureLoggedIn('/'), (req, res, next) => {
    if (req.body.id === null) {
        res.status(400).json({
            status: false,
            message: 'id is null'
        })
    } else {
        let feedback = database.feedBacks
        feedback.findByIdAndRemove(req.body.id).then(result => {
            res.status(200).json({
                status: true,
                message: result
            })
        })
    }
})
module.exports = router
