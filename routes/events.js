const express = require('express')
const router = express.Router()
const Event = require('../models/event')

//Get all
router.get('/', async (req,res) => {
    try {
        const events = await Event.find()
        res.json({"events": events})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//Getting one 
router.get('/:id', getEvents, (req,res) => {
    res.send(res.timetable.data)
    
})

//Creating One
router.post('/', async (req,res) => {
    const event = new Event({
        group: req.body.group,
        name: req.body.name,
        room: req.body.room,
        description: req.body.description,
        day: req.body.day,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date
    }) 
    console.log(req.body.value)

    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({message: err.message})

    }
})

//Updating One
router.patch('/:id', (req,res) => {
    
})

//Deleting One
router.patch('/:id', (req,res) => {
    
})

async function getEvents(req, res, next) {
    let event  
    try {
        event = await Event.findById(req.params.id)
        if (event == null) {
            return res.status(404).json({message: "Cannot find event"})

        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.event = event 
    next()
}

module.exports = router