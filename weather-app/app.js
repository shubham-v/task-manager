// console.log('Starting')

// setTimeout(() => {
//     console.log("2 second timer")
// }, 2000)

// setTimeout(() => {
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stopping')


const request = require('request')

// const url = 'https://api.darksky.net/forecast/4720be26fed15afbb8a6e1f9bcc7d784/37.8267,-122.4233?units=si&lang=es'
// request({ url: url, json: true }, (error, response) => {
//     // console.log(response)
//     // const data = JSON.parse(respnse.body)
//     // console.log(data)
//     // console.log(data.currently)
    
//     // console.log(response.body.currently)

//     // console.log(response.body.daily.data[0].summary +
//     //     ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + ' % chance of rain')


//     // console.log(error)
//     if (error) {
//         console.log("Unable to connec to wether service")
//     } else if (response.body.error) {
//         console.log("unable to find location")
//     } else {
//         console.log(response.body.daily.data[0].summary 
//             + ' It is currently ' 
//             + response.body.currently.temperature 
//             + ' degrees out. There is a ' 
//             + response.body.currently.precipProbability + ' % chance of rain')
//     }
// })


// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2h1YmhhbTEwOCIsImEiOiJjano5cGE4MjYwNjV2M2ZsazM1ZHBrc2JhIn0.OhdJLyBpeWptEx-BCrt_UA'
// request({url: geocodeUrl, json: true}, (error, response) => {
//     // console.log(response)

//     // const latitude = response.body.features[0].center[1]
//     // const longitude = response.body.features[0].center[0]
//     // console.log(latitude, longitude)

//     if (error) {
//         console.log("Unable tot connect to weather service")
//     } else if (!response.body.features || response.body.features.length === 0) {
//         console.log("Unable to find location try another search")   
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
// })

// const geocode = require('./utils/geocode')
// geocode.geocode('New York', (error, data) => {
//     console.log("Error: ", error)
//     console.log("Body: ",  data)
// })

// const forecast = require('./utils/forecast')
// forecast.forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

// const geocode  = require('./utils/geocode')
// const forecast = require('./utils/forecast')
// geocode.geocode('Boston', (error, data) => {
//     if (error)
//         return console.log("Error: ", error)
//     console.log("Body: ",  data)
//     forecast.forecast(data.latitude, data.longitude, (error, forecastData) => {
//         if (error) 
//             return console.log('Error', error)
//         console.log('Location: ', data.location)
//         console.log('Data', forecastData)
//     })
// })

// const yargs = require('yargs')
// yargs.version('1.1.0')
// const location = yargs.argv._
const location = process.argv[2]
// console.log(location)
if (location) {
    const geocode  = require('./utils/geocode')
    const forecast = require('./utils/forecast')
    geocode.geocode(location, (error, /*data*/{ latitude, longitude, location } ) => {
        if (error)
            return console.log("Error: ", error)
        // console.log("Body: ",  data)
        forecast.forecast(/*data.*/latitude, /*data.*/longitude, (error, forecastData) => {
            if (error) 
                return console.log('Error', error)
            console.log('Location: ', /*data.*/location)
            console.log('Data', forecastData)
        })
    })
}
