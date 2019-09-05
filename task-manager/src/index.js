const express = require('express')
require('./db/mongoose')
const userService = require('./service/userService')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (request, response) => {
    userService.save(request.body, response)
})

app.post('', (request, response) => {
    response.send('Success!')
})

app.listen(port, () => {
    console.log('Server is up on port')
})  