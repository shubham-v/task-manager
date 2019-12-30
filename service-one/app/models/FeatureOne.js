const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { config } = require('../helpers')

FeatureOneSchema = new Schema(
    {
        id: {
            type: Schema.Types.String,
            required: true
        }
    },
    {   
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'updatedon'
        },
        collection: config.mongo.schemas.featureInfo,
        versionKey: true
    }
)

module.exports = mongoose.model(config.mongo.schemas.featureInfo, FeatureOneSchema)