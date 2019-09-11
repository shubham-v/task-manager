const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})

// const User = mongoose.model('User', { 
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     }, 
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Invalid! email.')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 8,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error("Invalid! Password can't contain password")
//             }
//         }
//     }
// })

// const me = new User({ 
//     name: 'shubham',
//     email: 'shubham@email.co',
//     password: 'P@ssword'
// })

// me.save().then((/* me */) => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error! ' + error)
// }) 


// const Task = mongoose.model('Task', { 
//     name: {
//         type: String
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//         optional: true
//     }
// })

// const task1 = new Task({
//     name: 'task1',
//     description: '       Not an empty description',
//     //completed: false
// })

// task1.save().then((task1) => {
//     console.log(task1)
// }).catch((error) => {
//     console.log(error)
// })