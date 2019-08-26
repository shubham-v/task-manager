const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2h1YmhhbTEwOCIsImEiOiJjano5cGE4MjYwNjV2M2ZsazM1ZHBrc2JhIn0.OhdJLyBpeWptEx-BCrt_UA'
    console.log("Requesting URL: " + url)
    request({url: url, json: true}, (error, /*response*/ { body })=> {   
        if (error) {
            callback('Unable to connect to location service.', undefined)
        } else if (!/*response.*/body.features || /*response.*/body.features.length === 0) {
            callback('Unable to find location. Try another server.')  
        } else {
            console.log(/*response.*/body.features[0].center[0])
            callback(undefined, {
                latitude:  /*response.*/body.features[0].center[1],
                longitude: /*response.*/body.features[0].center[0],
                location:  /*response.*/body.features[0].place_name
            })
        }
    })

}

module.exports = geocode