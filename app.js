const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(express.static('public'))
app.use(fileUpload())

app.engine('hbs', exphbs.engine())
app.set('view engine', 'hbs')

const routes = require('./routes/konyv')
app.use('/', routes)

app.listen(PORT)