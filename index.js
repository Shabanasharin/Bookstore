//loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./DB/connection')
const router = require('./Routes/router')
const appMiddleware =  require('./Middlewares/appMiddleware')

const boserver = express()
boserver.use(cors())
boserver.use(express.json())
boserver.use(appMiddleware)
boserver.use(router)
boserver.use('/uploads', express.static('./uploads')) //image exporting to frontend

const PORT = 4000 || process.env.PORT
boserver.listen(PORT, ()=>{
    console.log('boserver listening on port ' +PORT);
})
boserver.get('/', (req,res)=>{
    res.send(`<h1>Bookstore server started</h1>`)
})