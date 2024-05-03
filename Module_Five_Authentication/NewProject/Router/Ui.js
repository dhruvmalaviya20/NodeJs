const libExpress = require('express')
const router = libExpress.Router()

router.get("/",(req,res)=>{
    res.render("index")     // res.render is used to convert pug file into html.
})

router.get("/home",(req,res)=>{
    res.render("index")     // res.render is used to convert pug file into html.
})

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/dashboard",(req,res)=>{
    res.render("dashboard")
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

module.exports = router