const mongoose = require('mongoose')

const animeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    description: { type: String, required: true },
    category: { type: String, required: true },
    episode_count: {type: Number, required: true},
    animeImage: {type: String, required: true}
})

module.exports = mongoose.model('Anime', animeSchema);