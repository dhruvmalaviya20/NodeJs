const libExpress = require('express')
const { libUtil } = require('../../util')
const movieRouter = libExpress.Router();
const libPath = require('path');
const { ObjectId } = require('mongodb');


// get All movies
// localhost/3000/movies
movieRouter.get('/', (req, res) => {
    libUtil.getMongodbConnection(async (db) => res.status(200).json({ movies: await db.collection('movies').find().toArray() }))
})

// get specific movie
movieRouter.get('/:id', (req, res) => {
    libUtil.getMongodbConnection(async (db) => res.status(200).json({ movies: await db.collection('movies').find({ _id: new ObjectId(req.params.id) }).toArray() }))
})

// post specific movie
movieRouter.post('/', (req, res) => {
    libUtil.getMongodbConnection(async (db) => {
        await db.collection('movies').insertOne(req.body)
        res.status(200).json()
    })
})

// Put specific movie 
movieRouter.put('/:id', (req,res)=> {
    libUtil.getMongodbConnection(async(db) => {
        await db.collection('movies').updateOne({_id : new ObjectId(req.params.id)},{$set : req.body})
        res.status(200).json()
    })
})

// Patch specific movie Data
movieRouter.patch('/:id', (req,res)=> {
    libUtil.getMongodbConnection(async(db) => {
        await db.collection('movies').updateOne({_id : new ObjectId(req.params.id)},{$set : req.body})
        res.status(200).json()
    })
})

//Delete specific movie
movieRouter.delete('/:id', (req,res)=> {
    libUtil.getMongodbConnection(async(db) => {
        await db.collection('movies').deleteOne({_id : new ObjectId(req.params.id)},{$set : req.body})
        res.status(200).json()
    })
})

// responce for other method
movieRouter.use((req, res) => {
    res.status(404).json({ error: 'Method Not Supported' })
})

module.exports = movieRouter