const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 8000
const connectDB = require('./config/database')
const cors = require('cors')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ['Authorization'], // Expose custom headers
  };
  
  app.use(cors(corsOptions));
app.use(express.json())


const authRouter = require('./routes/auth.Route')
const listRouter = require('./routes/list.Route')
const movieRouter = require('./routes/movie.Route')  

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/list',listRouter)
app.use('/api/v1/movie',movieRouter);

connectDB();
app.listen(PORT,(req,resp)=>{
    console.log(`Server is running at PORT at ${PORT}`)
})
