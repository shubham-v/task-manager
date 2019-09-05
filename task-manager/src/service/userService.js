const User = require('../db/entity/user') 

const save = (userJson) => {
    const user = new User.create(userJson)
    User.save(user, (user) => console.log(user), (error) => console.log(error))
}

module.exports = {
    save: save
}