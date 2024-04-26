const libExpress = require('express')
const util = require('../util')
const ObjectId = require('mongodb').ObjectId

productRouter = libExpress.Router()

//Rout to get all data.
productRouter.get('/', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').find().toArray()
                .then((getUser) => res.status(200).json({ data: getUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})


// Route to update specific data
productRouter.put('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').updateOne({ _id: new ObjectId(req.params.id) }, { $set: { pname: "Blutooth", price: "2200" } })
                .then((putUser) => res.status(202).json({ data: putUser }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to Update!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})


//Route to delete specific data.
productRouter.delete('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').deleteOne({ _id: new ObjectId(req.params.id) })
                .then((deleteUser) => res.status(202).json({ data: deleteUser }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to delete!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})


// Router to delete whole collection
productRouter.delete('/', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').drop()
                .then((deleteUser) => res.status(202).json({ data: deleteUser }),console.log("Product Deleted"))
                .catch(e => res.status(500).json({ error: "Failed to delete!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

productRouter.use('*', (req, res, next) => {
    res.status(404).json({ error: "Invalid Method!" })
})


module.exports = productRouter