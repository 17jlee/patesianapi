const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const multer = require("multer")
const app = express()
const mongoose = require('mongoose')
const { GridFsStorage } = require("multer-gridfs-storage")
const MongoClient = require("mongodb").MongoClient
const GridFSBucket = require("mongodb").GridFSBucket
const db = mongoose.connection
const url = 'mongodb://localhost/posts'
mongoose.connect('mongodb://localhost/posts')

const storage = new GridFsStorage({
    url,
    file: (req, file) => {
      //If it is an image, save to photos bucket
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        return {
          bucketName: "photos",
          filename: `${Date.now()}_${file.originalname}`,
        }
      } else {
        //Otherwise save to default bucket
        return `${Date.now()}_${file.originalname}`
      }
    },
  })

  const upload = multer({ storage }) 


//Get all
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find()
        //res.json(posts)
        res.json({"posts": posts})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})


router.get("/images", async (req, res) => {
try {
    //await mongoClient.connect()

    const database = db
    const images = database.collection("photos.files")
    const cursor = images.find({})
    const count = await cursor.count()
    if (count === 0) {
    return res.status(404).send({
        message: "Error: No Images found",
    })
    }

    const allImages = []

    await cursor.forEach(item => {
    allImages.push(item)
    })

    res.send({ files: allImages })
} catch (error) {
    console.log(error)
    res.status(500).send({
    message: "Error Something went wrong",
    error,
    })
}
})
  
router.get("/download/:filename", async (req, res) => {
try {
    //await mongoClient.connect()

    const database = db

    const imageBucket = new GridFSBucket(database, {
    bucketName: "photos",
    })

    let downloadStream = imageBucket.openDownloadStreamByName(
    req.params.filename
    )

    downloadStream.on("data", function (data) {
    return res.status(200).write(data)
    })

    downloadStream.on("error", function (data) {
    return res.status(404).send({ error: "Image not found" })
    })

    downloadStream.on("end", () => {
    return res.end()
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
    message: "Error Something went wrong",
    error,
    })
}
})

//Getting one 
router.get('/:id', getPost, (req,res) => {
    res.send(res.post.title)
    
})

//Creating One
router.post('/', upload.single("postimage"), async (req,res) => {
    const file = req.file

    if (!file) {
        console.log("nofile")
        const post = new Post({
            user: req.body.user,
            title: req.body.title,
            content: req.body.content,
            group: req.body.group,
        }) 

        try {
            const newPost = await post.save()
            res.status(201).json(newPost)
        } catch (err) {
            res.status(400).json({message: err.message})
    
        }
    }
    else {
        console.log("yes")
        const post = new Post({
            user: req.body.user,
            title: req.body.title,
            content: req.body.content,
            group: req.body.group,
            image: file.filename
        }) 

        try {
            const newPost = await post.save()
            res.status(201).json(newPost)
        } catch (err) {
            res.status(400).json({message: err.message})
    
        }
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
            return res.status(404).json({message: "Cannot find post"})

        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.post = post 
    next()
}

module.exports = router