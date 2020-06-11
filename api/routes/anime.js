const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Anime = require('../models/anime')

router.get('/', (req, res, next) => {
   Anime.find()
       .select('name description _id')
       .exec()
       .then(docs => {
           const response = {
               count: docs.length,
               anime: docs.map(doc => {
                   return {
                       name: doc.name,
                       description: doc.description,
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
})

router.post('/', (req, res, next) => {
    const anime = new Anime({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
    });
    anime
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Created a new Anime Object successfully",
                createdAnime: {
                    name: result.name,
                    description: result.description,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + result._id
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
})

router.get('/:animeId', (req, res, next) => {
    const id = req.params.animeId
    Anime.findById(id)
        .select('name description _id')
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
})

router.patch('/:animeId', (req, res, next) => {
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
});

router.delete('/:animeId', (req, res, next) => {
    const id = req.params.animeId
    Anime.deleteOne({_id: id})
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'Anime deleted',
                request: {
                    type: 'POST',
                    url: 'https://localhost:3000/anime',
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
})

module.exports = router;