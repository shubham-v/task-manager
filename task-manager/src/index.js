const express = require('express')
const userService = require('./service/userService')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (request, response) => {
    console.log(request.body)
    return userService.save(request.body)
})

app.post('', (request, response) => {
    response.send('Success!')
})

app.listen(port, () => {
    console.log('Server is up on port')
})  