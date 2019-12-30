module.exports = {
    mongo: {
        uri: process.env.MONGO_BASE_URI + process.env.MONGO_SERVICE_DATABSE,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PWD,
        connectionRetries: 2,
        schemas: {
            featureInfo: 'feature_info'
        }
    }
}