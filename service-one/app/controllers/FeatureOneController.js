const { FeatureOne } = require('../models')
const { ErrorService } = require('../services')

module.exports = {
    constrolFeatureRead: (req, res) => {
        const queryObject = {
            id: _get(req.params, 'id')
        }
        FeatureOne.find(queryObject, (err, result) => {
            if (err) {
                return ErrorService.databaseError(req, res, err)
            }

            res.json({
                response: result
            })

        })
    }
}