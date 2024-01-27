const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    subject: {
      type: String,
      required: true,
    },

    teacher: {
      type: String,
      required: true,
    },

    location: {
        type: String,
        required: true,
      },

    start: {
        type: Date,
        required: true,
      },

    end: {
        type: Date,
        required: true,
    }
  });

const timetableSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
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