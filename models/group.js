const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: [String],
        required: true
    },
    room: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
    
})


module.exports = mongoose.model('group', groupSchema)