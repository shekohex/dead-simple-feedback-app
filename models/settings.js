const mongoose = require('mongoose')
const Schema = mongoose.Schema
const settingsSchema = new Schema({
    settings: {
        title: String
    },
    userData: {
        username: String,
        name: String,
        profilePic: String,
        headerPic: String,
        facebook: String,
        twitter: String,
        github: String
    },
    senderData: {
        name: String,
        username: String,
        profilePic: String
    }
})
module.exports = settingsSchema