//config dotenv library
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
app.use("/api", require('./taskController/api'))

app.listen(process.env.APP_PORT,()=>{
    console.log(`Server is starting at Port: ${process.env.APP_PORT}`);
})