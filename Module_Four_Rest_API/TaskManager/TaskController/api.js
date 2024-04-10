const libExpress = require('express')
const routerAllTask = require('../Routers/All_task')

    apiTaskController = libExpress.Router()

    apiTaskController.use('/task',routerAllTask)

    apiTaskController.use('*',(req,res,next)=>{
        res.status(404).json({error:"No API Found!"})
    })

module.exports = apiTaskController 