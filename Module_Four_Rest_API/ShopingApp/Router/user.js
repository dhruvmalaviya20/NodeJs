const libExpress = require('express')
const util = require('../util')
const ObjectId = require('mongodb').ObjectId

userRouter = libExpress.Router()

//Rout to get all data.
userRouter.get('/', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').find().toArray()
                .then((getUser) => res.status(200).json({ data: getUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to get specific data.
userRouter.get('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').find({ _id: new ObjectId(req.params.id) }).toArray()
                .then((getUser) => res.status(200).json({ data: getUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to post specific data.
userRouter.post('/', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').insertOne({ name: "Kaushal", email: "kaushal33@gmail.com", password: "kevi$33" })
                .then((postUser) => res.status(200).json({ data: postUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to delete specific data.
userRouter.delete('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) })
                .then((deleteUser) => res.status(202).json({ data: deleteUser }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to delete!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })

        }
    })
})

// Route to put specific data
userRouter.put('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').updateOne({ _id: new ObjectId(req.params.id) }, { $set: { name: "Ankit" } })
                .then((putUser) => res.status(202).json({ data: putUser }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to Update!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

userRouter.use('*', (req, res, next) => {
    res.status(404).json({ error: "Invalid Method!" })
})


module.exports = userRouter