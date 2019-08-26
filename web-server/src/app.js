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

app.set('view engine', 'hbs')
app.use(express.static(publicDiretoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shubham'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'App',
        name: 'Shubham'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Message'
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})

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


const geocode = require("./utils/geocode")
const forecast  = require("./utils/forecast")
// app.com/weather
app.get('/weather', (req, res) => {
    // res.send('Weather Page')
    // res.send('<h1>Weather</h1>')

    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    geocode(req.query.address, (error,  { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => { 
            if (error) {
                return res.send({ error })
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philedelphia',
    //     address: req.query.address
    // })
})


app.get('/products', (req, res) => {
    // console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: "Search term must be provided"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.send("404")
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
