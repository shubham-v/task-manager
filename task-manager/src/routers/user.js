const express = require('express')
const router = new express.Router()
const User = require('../models/user')

const auth = require('../middleware/auth')

const multer = require('multer')
const sharp = require('sharp')

const { sendWelcomeEmail, cancellationEmail } = require('../emails/account')

// app.post('/users', (req, resp) => {
//     userService.save(
//         req.body, 
//         accepted(resp),
//         serverFail(resp)
//     )
// })

router.post('/users', async (req, resp) => {
    try {
        const user = await new User(req.body).save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        resp.status(201).send({ user, token })
    } catch(e) {
        resp.status(500).send(e)
    }

})

// app.get('/users', (req, resp) => {
//     userService.findAll(
//         success(resp), 
//         serverFail(resp))
// })

// router.get('/users', auth, async (req, resp) => {
//     try {
//         const users = await User.find({})
//         resp.status(200).send(users)
//     } catch(e) {
//         resp.status(500).send(e)
//     }
// })

router.get('/users', auth, async (req, res) => {
    res.status(200).send(req.user)
})

// router.get('/users/:id', async (req, resp) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user)
//             return resp.status(404).send('No user found with id')
//         return resp.status(200).send(user)
    
//     } catch(e) {
//         return resp.status(500).send(e)
//     }
// })

router.patch('/users'/*'/users/:id'*/, auth, async (req, resp) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation)
        return resp.status(400).send({ error: 'Invalid Updates!' })

    try {
        // const user = await User.findById(req.params.id)
        const user = req.user

        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user)
            return resp.status(404).send('No user found with id')
        return resp.status(200).send(user)
    } catch(e) {
        return resp.status(500).send(e)
    }
})

router.delete('/users'/*'/users/:id'*/, auth, async (req, resp) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)
        // if (!user)
        //     return resp.status(404).send('No user found with id')
        cancellationEmail(req.user.email, req.user.name)
        await req.user.remove()
        return resp.status(200).send(req.user)
    } catch (e) {
        return resp.status(500).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() 
        res.status(200).send({ user/*: user.getPublicProfile()*/, token })
    } catch (e) {
        res.status(401).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
    
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/signup', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() 
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(401).send(e)
    }
})

const upload = multer({
//   dest: 'avatar',
  limits: {
      fileSize: 1000000 
  }, 
  fileFilter(req, file, cb) {
    //   if (!file.originalname.endsWith('.pdf'))
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/))
        return cb(new Error('Please upload JPG, JPEG or PNG!'))
    cb(undefined, true)
    // cb(undefined, false)
  }
})

router.post('/users/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.post('/users/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar)
            throw new Error()
        res.set('Content-Type', 'image/jpg'/*'image/jpg'*/)
        res.send(user.avatar)
            
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router