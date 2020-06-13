const Anime = require('../models/anime')
const mongoose = require('mongoose')

exports.anime_get_all = (req, res, next) => {
    Anime.find()
        .select('name description category episode_count animeImage _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                anime: docs.map(doc => {
                    return {
                        name: doc.name,
                        description: doc.description,
                        category: doc.category,
                        episode_count: doc.episode_count,
                        animeImage: doc.animeImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/anime/' + doc._id
                        }
                    }
                })
            }
            console.log(docs)
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.anime_get_with_id = (req, res, next) => {
    const id = req.params.animeId
    Anime.findById(id)
        .select('name description category episode_count animeImage _id')
        .exec()
        .then(doc => {
            console.log("From database:", doc)
            if (doc) {
                res.status(200).json({
                    anime: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_PRODUCTS',
                        url: 'http://localhost/anime'
                    }
                })
            } else {
                res.status(404).json({message: "No valid entry found for provided ID."})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
}

exports.anime_create = (req, res, next) => {
    const anime = new Anime({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        episode_count: req.body.episode_count,
        animeImage: req.file.path
    })
    anime
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Created a new Anime Object successfully",
                createdAnime: {
                    name: result.name,
                    description: result.description,
                    category: result.category,
                    episode_count: result.episode_count,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/anime/" + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.anime_update = (req, res, next) => {
    const id = req.params.animeId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Anime.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Anime updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/anime/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.anime_delete = (req, res, next) => {
    const id = req.params.animeId
    Anime.deleteOne({_id: id})
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'Anime deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/anime',
                    body: { name: 'String', description: 'String'}
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

