require('dotenv').config()
const express = require('express')
const sequelize = require("./dbs")
const PORT = process.env.PORT || 5000
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const model = require('./models/models')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
    } catch (e) {
        console.log(e)
    }
}

start()