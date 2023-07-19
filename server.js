const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express() // added const here

app.use(serveStatic(path.join(__dirname, 'dist')))

const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
