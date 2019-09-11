const User = require('../models/user') 
const commons = require('./commons')

const save = (userJson, success, failure) => {
    const user = new User(userJson)
    commons.save(user, 
        success, 
        failure
    )
}

const findAll = (success, failure) => commons.findAll(
    User,
    success,
    failure
)

const findOne = (json, success, failure) => commons.findOne(
    User,
    json,
    success,
    failure
)

const findById = (id, success, failure) => commons.findById(
    User,
    id,
    success,
    failure
)

module.exports = {
    save: save,
    findAll: findAll,
    findOne: findOne,
    findById: findById
}