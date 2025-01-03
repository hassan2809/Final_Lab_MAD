const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const AuthRouter = require("./Routes/AuthRouter")
const path = require('path')

require("dotenv").config();
require("./Models/db")

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/auth", AuthRouter)

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})