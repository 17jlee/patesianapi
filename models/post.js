const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now

    },
    image: {
        type: String,
        required: false
    }
    
})


module.exports = mongoose.model('post', postSchema)