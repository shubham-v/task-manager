require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// User.findByIdAndUpdate('5d71f29881f4683ab05210fa', {age: 11}).then(user => {
//     console.log(user)
//     return User.countDocuments({ age: 10 })
// }).then(e => {
//     console.log(e)
// }).catch(e => {
//     console.log(e)
// })

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate('5d71f29881f4683ab05210fa', { age })
//     const count = await User.countDocuments({ age })
//     return count
// }

// updateAgeAndCount('5d71f29881f4683ab05210fa', 2).then((count) => {
//     console.log(count)
// }).catch(e => {
//     console.log(e)
// })

// Task.findByIdAndDelete('5d70d20199891a3f0c57a70b').then(e => {
//     console.log(e)
// }).catch(e => {
//     console.log(e)
// })


// Task.countDocuments({ completed: false }).then(e => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    return await Task.count()
}

deleteTaskAndCount('5d70dccb7186774f885bcb24').then(c => {
    console.log(c)
}).catch(e => {
    console.log(e)    
})

