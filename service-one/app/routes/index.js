const express = require('express')
const app = express()
const routesOneRoutes = require('./featureOneRoutes')

app.use('/1.0/featureOne', featureOneRoutes)

module.exports=app;