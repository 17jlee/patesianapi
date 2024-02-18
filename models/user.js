const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subscribedGroups: {
        type: [String],
        required: true
    },
    profilepic: {
        type: String,
        required: true
    },
    requestsFrom: {
        type: [String],
        required: true
    },
    friends: {
        type: [String],
        required: false
    }
    
})


module.exports = mongoose.model('user', userSchema)