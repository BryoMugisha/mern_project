import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import './config/db.js'
import { Router } from './routes/routes.js'

const path = require('path')
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config({path: "./config/.env"})

app.use('/admin', Router)

//production script
app.use(express.static("../client/build"));
app/get("*", (req,res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"))
})


app.listen(process.env.PORT, () => {
    console.log("App is Running")
})