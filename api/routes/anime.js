const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Anime = require('../models/anime')

router.get('/', (req, res, next) => {
   Anime.find()
       .exec()
       .then(docs => {
           console.log(docs)
               res.status(200).json(docs);
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
                message: "Handling POST request to /anime",
                createdAnime: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

    res.status(201).json({
        message: 'Handling POST requests to /anime',
        createdAnime: anime
    })
})

router.get('/:animeId', (req, res, next) => {
    const id = req.params.animeId
    Anime.findById(id)
        .exec()
        .then(doc => {
            console.log("From database:", doc)
            if (doc) {
                res.status(200).json({doc})
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
            console.log(result);
            res.status(200).json(result);
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
    Anime.remove({_id: id})
        .exec()
        .then(res => {
            res.status(200).json(res)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;