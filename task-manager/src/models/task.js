const mongoose = require('mongoose')
const validator = require('validator')

// const Task = mongoose.model('Task', { 
const taskSchema = new mongoose.Schema({
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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = new mongoose.model('Task', taskSchema)

module.exports = Task