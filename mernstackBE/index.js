const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json())
routes(app)

mongoose.connect(`${process.env.MONG_DB}`)
.then(()=> {
    console.log('connect db success');
})
.catch((err) => {
    console.log('error connect to mongoo');
    console.log(err);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})