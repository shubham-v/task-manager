const request = require('request') 

forecast = (latitude, longitude, callback) => {
    if (!latitude || !longitude)
        callback('Invalid location params', undefined)
    const url = 'https://api.darksky.net/forecast/4720be26fed15afbb8a6e1f9bcc7d784/'+ latitude +',' + longitude
    console.log("Requesting url: ", url)
    request({url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast service!', undefined)
        } else if (/*response.*/body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body.daily.data[0])
            callback(undefined, /*response.*/body.daily.data[0].summary 
                            + ' It is currently ' 
                            + /*response.*/body.currently.temperature 
                            + ' degrees out.' 
                            +' The lowest temperature is ' + body.daily.data[0].temperatureLow 
                            +', and highest temperature is ' + body.daily.data[0].temperatureHigh 
                            + '. There is a ' 
                            + /*response.*/body.currently.precipProbability + ' % chance of rain')
        }
    })
}

module.exports = forecast