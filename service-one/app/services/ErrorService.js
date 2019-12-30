const LogService = require('./LogService')

module.exports = {
    serverError: (req, res, errorObject) => {
        LogService.error(req.path, 'serverError', JSON.stringify(_.assign({}, req.body, errorObject)))
        
        return res.status(500).json({
            responseStatus: {
                status: 'FAIL',
                code: _.get(errorObject, 'responseStatus.code', 500),
                message: _.get(errorObject, 'responseStatus.message') || _.get(errorObject, 'message', 'Something went wrong'),
                detail: errorObject
            }
        })
    },
    databaseError: (req, res, errorobject) => {
        LogService.error(req.path, 'databaseError', JSON.stringify(_.assign({}, errorObject)))

        return res.status(503).json({
            responseStatus: {
                status: 'FAIL',
                code: _.get(errorObject, 'responseStatus.code', 500),
                message: _.get(errorObject, 'message', 'An internal server error occurred')
            }
        })
    },
    connectionError: (errorObject) => {
        LogService.error('ErrorService', 'connectionError', JSON.stringify(_.assign({}, errorObject)))
    }
}