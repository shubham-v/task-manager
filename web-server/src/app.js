//core modules
const path = require('path')


// npm modules
const express = require('express')

console.log(__dirname) // ../src
console.log(path.join(__dirname)) // ../src
console.log(__filename) // ../src/app.js
console.log(path.join(__dirname, '../..'))

const app = express()
const publicDiretoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDiretoryPath))

// app.com
// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

// // app.com/help
// app.get('/help', (req, res) => {
//     // res.send('Help Page')
//     // res.send({
//     //     name: 'Shubham',
//     //     age: 25
//     // })
//     res.send([      {
//         name: 'Shubham'
//     }, {
//         name: 'Node'
//     }])
// })

// // app.com/about
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.com/weather
app.get('/weather', (req, res) => {
    // res.send('Weather Page')
    // res.send('<h1>Weather</h1>')
    res.send({
        forecast: 'This is forecast.',
        location: 'Bengaluru'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
