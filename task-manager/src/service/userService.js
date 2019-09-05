const User = require('../models/user') 

const save = (userJson, response) => {
    const user = new User.create(userJson)
    User.save(user, 
        (u) => response.send(user) , 
        (error) => { 
            console.log(error) 
            response.send({ msg: 'Error while saving user' })
        }
    )
}

module.exports = {
    save: save
}