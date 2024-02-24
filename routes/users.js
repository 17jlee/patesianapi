const express = require('express')
const router = express.Router()
const User = require('../models/user')
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
        const users = await User.find()
        //res.json(posts)
        res.json({"users": users})
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
router.get('/:username', getUser, (req,res) => {
    res.json({"users": res.user})
    
})

//Creating One
router.post('/', upload.single("pfpimage"), async (req,res) => {
    const file = req.file
    console.log(req)
    console.log(file)

    if (!file) {
        res.status(400).json({message: "No file uploaded"})
    }
    else {
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            subscribedGroups: req.body.subscribedGroups,
            profilepic: file.filename,
            requestsFrom: req.body.requestsFrom,
            friends: req.body.friends
        }) 
    
        try {
            const newUser = await user.save()
            res.status(201).json(newUser)
        } catch (err) {
            res.status(400).json({message: err.message})
    
        }
    }

    
})

//Updating One
router.patch('/:username', getUser, async (req, res) => {
    if (req.body.requestsFrom != null) {
        res.user.requestsFrom = req.body.requestsFrom
    }
    if (req.body.subscribedGroups != null) {
        res.user.subscribedGroups = req.body.subscribedGroups
    }
    if (req.body.friends != null) {
        res.user.friends = req.body.friends
    }
    console.log(req.body.name)
    // Add more properties to update as needed
    console.log(res.user);
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//Deleting One
router.delete('/:id', getUser, async(req,res) => {
    try {
        await res.post.deleteOne()
        res.json({message: 'Deleted post'})
    } catch (err) {
        res.status(500).json({message: err.message})

    }
    
})

async function getUser(req, res, next) {
    let user  
    try {
        user = await User.find({username: req.params.username})
        console.log(user.count)
        if (user == null) {
            return res.status(404).json({message: "Cannot find user"})

        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.user = user[0] 
    next()
}


module.exports = router