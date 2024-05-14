let util = require('../util')

module.exports = (req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).end();
    }
    else {
        console.log(`URL Called ${req.method}`);
        next()
    }
}