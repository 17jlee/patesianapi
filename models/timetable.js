const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    subject: {
      type: String,
      required: true,
    },

    bodyPreview: {
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
    },

    location: {
        type: String,
        required: true,
      }
  });

const timetableSchema = new mongoose.Schema({
    data: {
        type: [eventSchema],
        required: true
    }
});
  



module.exports = mongoose.model('timetable', timetableSchema)