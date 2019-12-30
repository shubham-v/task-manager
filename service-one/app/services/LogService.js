const { winston } = require('../helpers')

module.exports = {
    error: (moduleName, moduleMethod, logObject) => {
        console.log({
            thread_id: process.pid,
            logger_level: 'ERROR',
            module_name: moduleName,
            module_method: moduleMethod,
            log_object: logObject
        })
    },
    performance: (intent, responseTime) => {
        console.log({
            thread_id: process.pid,
            logger_level: 'INFO',
            intent: intent,
            response_time: responseTime
        })
    },
    mongo: (collectionName, queryType, logObject) => {
        console.log({
            thread_id: process.pid,
            logger_level: 'ERROR',
            collection_name: collectionName,
            query_type: queryType,
            log_object: logObject
        })
    },
    access: (moduleName, moduleMethod, logObject) => {
        console.log({
            thread_id: process.pid,
            logger_level: 'ERROR',
            module_name: moduleName,
            module_method: moduleMethod,
            log_object: logObject
        })
    }
}