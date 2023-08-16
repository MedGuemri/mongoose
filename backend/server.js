const express = require('express')
require("dotenv").config()
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT
const userRoutes= require("./routes/userRoutes")
const connect=require('./helpers/dbConnect')

connect()
app.use(express.json())
app.use('/api/user',userRoutes)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))