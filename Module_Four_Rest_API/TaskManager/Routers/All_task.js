const libExpress = require('express')
const util = require('../util')
const ObjectId = require('mongodb').ObjectId

const taskRouter = libExpress.Router()

//Rout to get all players.
taskRouter.get('/', (req, res, _) => {

    util.getDbConnection(function (db) {

        if (db) {
            db.collection('All_task').find().toArray()
                .then((taskData) => res.status(200).json({ data: taskData }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to get specific data.
taskRouter.get('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('All_task').find({ _id: new ObjectId(req.params.id) }).toArray()
                .then((taskData) => res.status(200).json({ data: taskData }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to post specific data.
taskRouter.post('/', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('All_task').insertOne({ sub: "Bootstrap", task: "assignment", submit: "15/apr/2024" })
                .then((NewData) => res.status(200).json({ NewData }))
                .catch(e => res.status(500).json({ error: "Data post failed!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to delete specific data.
taskRouter.delete('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('All_task').deleteOne({ _id: new ObjectId(req.params.id) })
                .then((taskDataDelete) => res.status(202).json({ data: taskDataDelete }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to delete!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })

        }
    })
})

// Route to put specific data
taskRouter.put('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
            if (db) {
            db.collection('All_task').updateOne({_id: new ObjectId ("66151a2f6228fc619397ee51") },{ $set: {sub:"jQuery" }})
                .then((taskUpdatedData) => res.status(202).json({ data: taskUpdatedData }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to Update!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

    taskRouter.use('*', (req, res, next) => {
        res.status(404).json({ error: "Invalid Method!" })
    })
    module.exports = taskRouter 