const {libUtil} = require('../util')

module.exports = (req,res,next)=>{
    libUtil.logger(`Incoming Request : ${req.method} ${req.path}`);
    next()
}