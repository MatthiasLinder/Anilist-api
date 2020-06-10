const mongoose = require('mongoose')

const animeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    description: { type: String, required: true }
})

module.exports = mongoose.model('Anime', animeSchema);