const express = require('express')
require('./db/mongoose')
// const userService = require('./service/userService')
// const taskService = require('./service/taskService')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next()

//     if (req.method == 'GET') {
//         res.status(405).send('GET request are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Under Mantainance. Check back soon!')
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const createResp = 
  (response, respCode) => (e) => response.status(respCode).send(e)
// const accepted   = (response) => createResp(response, 201)
// const success    = (response) => createResp(response, 200)
// const serverFail = (response) => createResp(response, 500)

// const router = new express.Router()
// router.get('/test', (req, resp) => {
//     resp.send('This is from other router')
// })
// app.use(router)


app.post('', (request, response) => {
    response.send('Success!')
})

app.listen(port, () => {
    console.log('Server is up on port')
})  


// const bcrypt = require('bcryptjs')
// const hash = async (pwd) => {
//     const hashedPassword = await bcrypt.hash(pwd, 8)
//     const isMatch = await bcrypt.compare(pwd, hashedPassword)
// }

// const jwt = require('jsonwebtoken')
// const token = async () => {
//     const token = jwt.sign({ _id: 'dummy_id' }, 'secret_key', { expiresIn: /*'0 seconds'*/ '7 days' })
//     console.log(token)

//     const payload = jwt.verify(token, 'secret_key')
//     console.log(payload)
// }
// token()


// const pet = {
//     name: 'cat one'
// }
// pet.toJSON = function () {
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))

// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async () => {
//     // const task = await Task.findById('5d752aef81c7591ff0a5fb05') 
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner.name)
//     const user = await User.findById('5d7529ba32401048486ff8a2')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()


// const multer = require('multer')

// const upload = multer({
//   dest: 'uploadedFiles'
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
// })

const errorMiddleWare = (req, res, next) => {
  throw new Error('From middleware')
}

app.post('/upload', errorMiddleWare, (req, res) => {
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})