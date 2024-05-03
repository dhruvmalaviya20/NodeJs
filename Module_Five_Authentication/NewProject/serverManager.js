const libExpress = require('express')
const {libUtil} = require('./util')
const requestLogger = require('./middleWare/requestLogger')
const jwtTokenVerifier = require('./middleWare/jwtTokenVerifier')
const routerMovie = require('./Router/api/movieRouter')
const routerUi = require('./Router/Ui')
const routerUser = require('./Router/api/routerUser')
const bodyParser = require('body-parser');

const serverManager = {}

serverManager.prepare=()=>{

    // init server.....
    serverManager.server = libExpress()

    // access static folder
    serverManager.server.use(libExpress.static('static'))

    // ask app to use pug engine
    serverManager.server.set('view engine', 'pug')

    // Post body parcer.....
    serverManager.server.use(libExpress.json())

    // middleware.....
    serverManager.server.use(requestLogger)

    // index
    serverManager.server.use(routerUi)

    // apis are below....
    serverManager.server.use('/user',routerUser)

    // movie api....
    serverManager.server.use('/movies',jwtTokenVerifier,routerMovie)

    // Incase invalid request comes up
    serverManager.server.use((req,res)=>{
        res.status(404).json({error : 'No API FOUND'})
    })
}

serverManager.start=()=>{
    serverManager.server.listen(process.env.PORT,()=>{
        libUtil.logger(`Server started on port ${process.env.PORT }`,3);
    })
}

module.exports = serverManager
