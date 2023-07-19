const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express() // added const here

app.use(serveStatic(path.join(__dirname, 'dist')))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
