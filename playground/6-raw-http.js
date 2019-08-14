const https = require('https')
const url = 'https://api.darksky.net/forecast/4720be26fed15afbb8a6e1f9bcc7d784/37.8267,-122.4233'
console.log("Requesting url: ", url)
const request = https.request(url, (response) => {
    let data = ''

    response.on('data', chunk => {
        // console.log(chunk)
        data = data + chunk.toString()
        //console.log(data)
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', error => {
    console.log('An error', error)
})

request.end()