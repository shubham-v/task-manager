const express = require('express')
const app = express()
const routes = require('./app/routes')

app.get('', (req, res) => {
    res.send({
        name: 'Server 1',
        status: 100 
    })
})

app.get('/health', (req, res) => {
    res.send("100")
})

app.use('/service-one/api', routes)

app.get('*', (req, res) => {
    res.send("404")
})

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port +'.')
})