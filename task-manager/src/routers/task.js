const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, resp) => {
    
        // const task = new Task(req.body).save()
        const task = new Task({
            ...req.body,
            owner: req.user._id    
        })
    try {
        await task.save()
        resp.status(201).send(task)
    } catch(e) {
        resp.status(500).send(e)
    }
})

router.get('/tasks', auth, async (req, resp) => {
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':') 
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const tasks = await Task.find({})
        // const user = await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     // createdAt: -1
                //     completed: 1
                // }
            }
        }).execPopulate()
        resp.status(200).send(req.user.tasks)
    } catch(e) {
        resp.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, resp) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findById({ _id, owner: req.user._id })
        if (!task)
            return resp.status(404).send('No task found with id')
        return resp.status(200).send(task)
    } catch(e) {
        return resp.status(500).send(task)
    }
})

router.patch('/tasks/:id', auth, async (req, resp) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'name', 'description' ]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation)
        return resp.status(400).send({ error: 'Invalid Updates!' })

    const _id = req.params.id
    try {
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task)
            return resp.status(404).send('No task found with id')
        
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        
        return resp.status(200).send(task)
    } catch(e) {
        return resp.status(500).send(task)
    }
})

router.delete('/tasks/:id', auth, async (req, resp) => {

    const _id = req.params.id
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task)
            return resp.status(404).send('No user found with id')
        await task.remove()
        return resp.status(200).send(task)
    } catch (e) {
        return resp.status(500).send(e)
    }
})

module.exports = router