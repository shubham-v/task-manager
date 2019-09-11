const Save = (model, success, failure) => {
    model.save().then((e) => {
        success(e)
    }).catch((error)=> {
        failure(error)
    })
}

const findAll = (model, success, failure) => {
    model.find({}).then((l) => {
        success(l)
    }).catch((e) => {
        failure(e)
    })
}

const findOne = (model, object, success, failure) => {
    model.findOne(object).then((e) => {
        success(e)
    }).catch((e) => {
        failure(e)
    })
}

const findById = (model, id, success, failure) => {
    model.findById(id).then((e) => {
        success(e)
    }).catch((e) => {
        failure(e)
    })
}

module.exports = {
    save: Save,
    findAll: findAll,
    findOne: findOne,
    findById: findById
}