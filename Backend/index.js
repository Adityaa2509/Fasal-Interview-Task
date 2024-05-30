const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 8000
const connectDB = require('./config/database')
const cors = require('cors')
const cookieparser = require('cookie-parser')
app.use(cors())
app.use(express.json())
app.use(cookieparser())
const authRouter = require('./routes/auth.Route')



app.use('/api/v1/auth',authRouter)



connectDB();
app.listen(PORT,(req,resp)=>{
    console.log(`Server is running at PORT at ${PORT}`)
})
