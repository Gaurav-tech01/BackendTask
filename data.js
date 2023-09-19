const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name: {
        type: String
    },
    last: {
        type: String
    },
    buy: {
        type: String,
    },
    sell: {
        type: String,
    },
    volume: {
        type: String,
    },
    baseunit: {
        type: String,
    }
})

module.exports = mongoose.model('data', DataSchema)