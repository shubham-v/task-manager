const Task = require('../models/task') 
const commons = require('./commons')

const save = (taskJson, success, failure) => {
    const task = new Task(taskJson)
    commons.save(
        task, 
        success,
        failure
    )
}

const findAll = (success, failure) => commons.findAll(
    Task,
    success,
    failure
)

const findOne = (json, success, failure) => commons.findOne(
    Task,
    json,
    success,
    failure
)

const findById = (id, success, failure) => commons.findById(
    Task,
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