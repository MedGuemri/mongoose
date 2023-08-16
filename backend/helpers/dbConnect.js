const mongoose = require("mongoose")
require("dotenv").config()


const connect=async()=>{

    await mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("connect to MongoDB"))
    .catch(err=>console.log(err))
}
module.exports=connect