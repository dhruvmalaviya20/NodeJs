const libJWT = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const tokenString = req.headers['authorization']

    if (tokenString) {

        libJWT.verify(tokenString.split(" ")[1], process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                // Token is invalid
                console.error('Invalid token:', err.message);
                res.status(400).json() 
            } else {
                // Token is valid
                console.log('Token is valid');
                console.log('Decoded payload:', decoded);
                next()
            }
        })
        // const decoded = libJWT.verify(tokenString.split(" ")[1], process.env.TOKEN_KEY)
        // console.log(decoded);
        // next()
    }
    else {
        res.status(400).json()
    }
}