require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
mongoose.connect('mongodb://localhost/posts')
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const postsRouter = require('./routes/posts.js')
app.use('/posts', postsRouter)

const timetableRouter = require('./routes/timetables.js')
app.use('/timetables', timetableRouter)

const groupRouter = require('./routes/groups.js')
app.use('/groups', groupRouter)

const eventRouter = require('./routes/events.js')
app.use('/events', eventRouter)

const usersRouter = require('./routes/users.js')
app.use('/users', usersRouter)

app.listen(3000, () => console.log('server started')) 
