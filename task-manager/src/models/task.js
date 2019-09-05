const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', { 
    name: {
        type: String
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        optional: true
    }
})

module.exports = {
    task: Task
}