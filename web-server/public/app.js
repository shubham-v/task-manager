fetch('https://127.0.0.1:3000/weather?address=!').then((response)=> {
    response.json.then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})