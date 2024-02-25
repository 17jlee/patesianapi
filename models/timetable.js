const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    subject: {
      type: String,
      required: false,
    },

    teacher: {
      type: String,
      required: false,
    },

    location: {
        type: String,
        required: false,
      },

    start: {
        type: Date,
        required: false,
      },

    end: {
        type: Date,
        required: false,
    }
  });

const timetableSchema = new mongoose.Schema({
    user: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    data: {
        type: [eventSchema],
        required: true
    }
});
  



module.exports = mongoose.model('timetable', timetableSchema)