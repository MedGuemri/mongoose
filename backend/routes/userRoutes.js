const Router = require("express").Router()
const userController= require("../controllers/userController")
const isAuth = require("../middleware/authmiddleware")


Router.post("/register",userController.register)
Router.post("/login",userController.login)
Router.get("/me",isAuth,userController.me)


module.exports=Router