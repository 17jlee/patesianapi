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
    day: {
        type: [String],
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
    
})


module.exports = mongoose.model('event', eventSchema)