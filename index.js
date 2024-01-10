const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const contactRoutes = require('./routes/contacts')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())

const hostname = '127.0.0.1'
const PORT = process.env.PORT || 8000
const CONN_URL = process.env.CONN_URL

app.get('/', (req, res) => {
    res.json({
        message: 'service is up!'
    })
})
app.use('/', contactRoutes)

mongoose
  .connect(CONN_URL)
  .then(() =>
    app.listen(PORT, hostname, () =>
      console.log(`Server running on http://${hostname}:${PORT}/`)
    )
  )
  .catch((err) => console.log(err));

mongoose.set("strictQuery", false);

