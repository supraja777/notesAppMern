const connectToMongo = require('./db')
const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
var cors = require('cors')
connectToMongo()

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
 

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})

