const mongoose = require('mongoose')
const LogService = require('./LogService')

module.exports = {
    save: (collectionName, dataObject, callback) => {
        let Model = mongoose.model(collectionName)
        let instance = new Model(dataObject)
        let startTime = new Date().getTime()
        let endTime = 0;

        instance.save( (err, doc) => {
            endTime = new Date().getTime()
            LogService.performance(`${collectionName} - insert`, endTime - startTime)
            if (err) {
                LogService.mongo(collectionName, 'insert', JSON.stringify(dataObject))
            }
            callback(err, doc)
        })
    }
}