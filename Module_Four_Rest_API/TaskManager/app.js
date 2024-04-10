//config dotenv
require('dotenv').config()
//import util
const util = require('./util')
//import express http
const libExpress = require('express')
//import middleware
const requestMiddleware = require('./middleware/requestLogger')

const app = libExpress()
app.use(requestMiddleware)

// for API
app.use("/api", require('./TaskController/api'))

// for UI
app.use(require('./TaskController/ui'))

app.listen(process.env.APP_PORT,()=>{
    console.log(`Server is starting at ${process.env.APP_PORT}`);
})

