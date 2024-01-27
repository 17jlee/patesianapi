const express = require('express')
const router = express.Router()
const Timetable = require('../models/timetable')

//Get all
router.get('/', async (req,res) => {
    try {
        const timetables = await Timetable.find()
        res.json(timetables)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//Getting one 
router.get('/:id', getSubscriber, (req,res) => {
    res.send(res.timetable.data)
    
})

//Creating One
router.post('/', async (req,res) => {
    const subscriber = new Timetable({
        data: req.body.value
    }) 
    console.log(req.body.value)

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
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

async function getSubscriber(req, res, next) {
    let subscriber  
    try {
        subscriber = await Timetable.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({message: "Cannot find subscriber"})

        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber 
    next()
}

module.exports = router