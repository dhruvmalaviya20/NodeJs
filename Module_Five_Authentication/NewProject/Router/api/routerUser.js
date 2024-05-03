const libExpress = require('express')
const router = libExpress.Router()
const libJWT = require('jsonwebtoken')

router.post('/token', (req, res) => {

    if (req.body.email == "dhruv20@gmail.com" && req.body.password == "1234") {

        libJWT.sign({ email: "dhruv20@gmail.com" }, process.env.TOKEN_KEY, { expiresIn: "1h" }, (error, token) => {

            res.status(200).json({ token: token })

        })
    }
    else {
        res.status(400).json
    }

})

module.exports = router