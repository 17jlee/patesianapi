const express = require('express')
const router = express.Router()
const Timetable = require('../models/timetable')
const User = require('../models/user')

//Get all
router.get('/', async (req,res) => {
    try {
        const timetables = await Timetable.find()
        res.json({"timetables": timetables})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//Getting one 
router.get('/:username', getTimetable, (req,res) => {
    console.log(res.timetable)
    res.send(res.timetable[res.timetable.length - 1]);

})

//Creating One
router.post('/', async (req,res) => {
    const subscriber = new Timetable({
        user: req.body.user,
        data: req.body.data
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

async function getTimetable(req, res, next) {
    let timetable  
    try {
        timetable = await Timetable.find({user: req.params.username})
        if (timetable == null) {
            return res.status(404).json({message: "Cannot find subscriber"})

        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.timetable = timetable 
    next()
}

module.exports = router