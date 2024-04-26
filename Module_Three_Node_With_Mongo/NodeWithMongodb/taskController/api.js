const libExpress = require('express')

const routerUser = require('../Router/user')
const routerProduct = require('../Router/product')

apiTaskController = libExpress.Router()

apiTaskController.use('/users', routerUser)
apiTaskController.use('/products', routerProduct)

apiTaskController.use('*',(req,res,next)=>{
    res.status(404).json({error:"No API Found!"})
})

module.exports = apiTaskController