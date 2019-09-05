const mongoose = require('mongoose')
const validator = require('validator')
const create = mongoose.model('User', { 
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid! email.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Invalid! Password can't contain password")
            }
        }
    }
})

const Save = (user, success, failure) => 
    user.save().then((user) => {
        success(user)
    }).catch((error)=> {
        failure(error)
    })

module.exports = {
    create: create,
    save: Save
}