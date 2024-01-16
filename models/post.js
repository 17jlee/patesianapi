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
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now

    }
})



module.exports = mongoose.model('post', postSchema)