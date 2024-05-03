// const libHttp = require("http");

// libHttp.createServer((req, res)=>{

//     if(req.url == "/"){
//         res.write("Home Page")
//     }
//     else if(req.url == "/index"){
//         res.write("Index Page")
//     }
//     else{
//         res.write("page not found")
//     }
//     res.end()

// }).listen(2000)


// const libCluster = require('cluster');
// const numCPUs = require('os').cpus().length;
// const libHttp = require("http");
// const PORT = 2000;

// if (libCluster.isMaster) {

//     libHttp.createServer((req, res) => {
//     }).listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`, process.pid);
//     });

//     libCluster.fork()   //Used for create child processor
//     libCluster.fork()
//     libCluster.fork()
//     libCluster.fork()

//     libCluster.on('exit', (workers, code, signal) => {

//         console.log(`Worker ${workers.process.pid} died`);

//         console.log(Object.keys(libCluster.workers).length);

//         if(Object.keys(libCluster.workers).length === 0){
//             console.log('All Child ended...');
//         }
//     })

//     // console.log(libHttp);   //for show http features.
// }
// else {
//     setTimeout(() => {
//         console.log('Hello, Worker is running on', process.pid);
//         process.exit(0)
//     },Math.floor(Math.random()*10)*1000)
// }



// const libCluster = require('cluster');
// const numCPUs = require('os').cpus().length;
// const libHttp = require("http");
// const libfs = require('fs');
// const libMoment = require('moment')
// const libPath = require('path')
// const PORT = 2000;

// if (libCluster.isMaster) {

//     libHttp.createServer((req, res) => {

//     }).listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`, process.pid);
//     });
        
//     // libfs.appendFile('Dhruv.log', 'Today my logs is here', (err, updateFile) => {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     else {
//     //         console.log('file updated'
//     //         );
//     //     }
//     // })

//     libCluster.fork()

//     libCluster.on('exit',(workers, code, signal) => {

//         if(Object.keys(libCluster.workers).length === 0){

//             logger = (msg, track = true) => {
//                 let currentDataTime = libMoment().format('DD-MM-YYYY HH:mm:ss')
        
//                 let currentLogFile = process.cwd() + libPath.sep + 'Log' + libPath.sep + `${libMoment(currentDataTime, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')}.log`;
        
//                 let logToprint = `${currentDataTime} ${msg}`
//                 currentLogFile
//                 console.log(logToprint);
                
//                 console.log('My logs');
    
//                 if (track) {
                    
//                     // if dose not exist the create one log file
//                     if (!libfs.existsSync(currentLogFile)) {
//                         libfs.writeFileSync(currentLogFile, `----------Logs----------`)
//                     }
                    
//                     // for write log inside
//                     libfs.appendFile(currentLogFile, "\n" + logToprint, (error) => {
//                         if (error) {
//                             throw new Error('Failed to save log, please check the issue: ' + error);
//                         }
//                     });        
//                 }
//             }
//             console.log('File Created');
//         }
//     })
// }
// else {
//     // setTimeout(() => {
//         // console.log('Hello, Worker is running on', process.pid);
//         // process.exit(0)

//         console.log('Dhruv');
//         process.exit(0)

//     // }, 3000)
// }



require('dotenv').config()

//import server manager
const server = require('./serverManager');

//server prepare
server.prepare()

//server start
server.start()