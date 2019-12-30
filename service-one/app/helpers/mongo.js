require('../models')
const mongoose = require('mongoose')
const config = require('./config')
const { LogService, ErrorService } = require('../services')

const dbURI = config.mongo.uri

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: config.mongo.connectionRetries,
    auth: {
        user: config.mongo.user,
        password: config.mongo.password
    }
})

mongoose.connection.on('conncted', function() {
    LogService.access('mongo', 'onConnected', 'Connected to mongodb')
})

mongoose.connection.on('disconnected', function() {
    ErrorService.connectionError()
})

mongoose.connection.on('error', function(err) {
    ErrorService.connectionError(err)
})

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0)
    })
})