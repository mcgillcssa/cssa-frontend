const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express()

// Use the history fallback middleware before your static serve middleware
app.use(history())

app.use(serveStatic(path.join(__dirname, 'dist')))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
