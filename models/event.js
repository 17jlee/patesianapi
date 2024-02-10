const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    day: {
        type: [String],
        required: false
    },
    startTime: {
        type: String,
        required: false
    },
    endTime: {
        type: String,
        required: false
    }
    
})


module.exports = mongoose.model('event', eventSchema)