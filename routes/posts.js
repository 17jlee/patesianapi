const express = require('express')
const router = express.Router()
const Post = require('../models/post')

//Get all
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//Getting one 
router.get('/:id', getPost, (req,res) => {
    res.send(res.post.title)
    
})

//Creating One
router.post('/', async (req,res) => {
    const post = new Post({
        user: req.body.user,
        title: req.body.title,
        content: req.body.content,
        group: req.body.group
    }) 

    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(400).json({message: err.message})

    }
})

//Updating One
router.patch('/:id', getPost, async(req,res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }   
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    
    } catch (err) {
        res.status(400).json({message: err.message})
        
}})

//Deleting One
router.delete('/:id', getPost, async(req,res) => {
    try {
        await res.post.deleteOne()
        res.json({message: 'Deleted post'})
    } catch (err) {
        res.status(500).json({message: err.message})

    }
    
})

async function getPost(req, res, next) {
    let post  
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({message: "Cannot find subscriber"})

        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.post = post 
    next()
}

module.exports = router