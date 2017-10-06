const mongoose = require('mongoose')
const Schema = mongoose.Schema
const feedBackSchema = new Schema({
    message: {
        text : {
            value: String,
            createdAt: { type: Date, default: Date.now }
        },
        reply: {
            value: String,
            createdAt: { type: Date, default: Date.now }
        },
    }
})
module.exports = feedBackSchema