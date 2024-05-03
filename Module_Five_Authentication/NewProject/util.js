const libChalk = require('chalk')
const libMoment = require('moment')
const libFs = require('fs');
const libPath = require('path');
const { MongoClient } = require('mongodb');

const util = {}

util.logColorPicker = {
    0: libChalk.white,
    1: libChalk.green,
    2: libChalk.yellow,
    3: libChalk.red
}
util.logSignPicker = {
    0: "[*]",
    1: "[+]",
    2: "[!]",
    3: "[-]"
}


util.logger = (msg, escalation = 0) => {

    const logMsg = (`${util.logSignPicker[escalation]}${libMoment().format('DD-MM-YYYY HH:mm:ss')} ${msg}`)

    console.log(util.logColorPicker[escalation](logMsg));

    const logFile = `${libMoment().format('DD-MM-YYYY')}.log`

    libFs.access(libPath.join(process.cwd(), "logs", logFile), libFs.constants.F_OK, (error) => {
        if (error) {
            libFs.writeFileSync(libPath.join(process.cwd(), "logs", logFile), logMsg)
        }
        else {
            libFs.appendFileSync(libPath.join(process.cwd(), "logs", logFile), `\n${logMsg}`)
        }
    })
}

util.getMongodbConnection = async (CallBack) => {

    const mongoServerConnection = new MongoClient(process.env.MONGO_URL);

    try {
        await mongoServerConnection.connect()
        util.logger('Mongo DB Connected...',1)
        await CallBack(mongoServerConnection.db())
        util.logger('Data Was Served...',1)
    }
    catch (e) {
        util.logger(e, 3)
    }
    finally{
        await mongoServerConnection.close()
        util.logger('Mongo DB Disconnected...',2)
    }

}

module.exports.libUtil = util