const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database connected Successfully at ${process.env.MONGODB_URI}`)
    }catch(err){
        console.log(err)
        console.log("Problem while connecting to DATABASE")
    }
}

module.exports = connectDB;