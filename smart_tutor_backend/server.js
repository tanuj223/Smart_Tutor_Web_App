// import express from 'express';

import express from 'express';
// module.exports = router;
// export default router
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';



///routes here 
import authRouter from "./routes/auth.routes.js"
import chapterRouter from "./routes/chapter.routes.js"

// import catagory from './model/catagory.model.js';
const __dirname = path.resolve();

// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");
// const mongoose = require('mongoose')
// const cors = require('cors')



const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', "ejs")
app.use(express.static("public"));

app.use(express.json({ limit:"30mb", extended: true }))
app.use(express.urlencoded({ limit:"30mb", extended:true }))

app.use(cors())



app.use('/auth', authRouter)
app.use('/chapter', chapterRouter)


const CONNECTION_URL = "mongodb+srv://be_proj:1234@cluster0.aptnm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.port || 5000;

// app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error))


