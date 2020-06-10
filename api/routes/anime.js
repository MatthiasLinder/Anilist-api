const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).json({
       message: 'Handling GET requests to /anime'
   })
})

router.post('/', (req, res, next) => {
    const anime = {
        name: req.body.name,
        description: req.body.description
    }
    res.status(201).json({
        message: 'Handling POST requests to /anime',
        createdAnime: anime
    })
})

router.get('/:animeId', (req, res, next) => {
    const id = req.params.animeId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered the Special ID.',
            id: id
        })
    }else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:animeId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated Anime!'
    })
})

router.delete('/:animeId', (req, res, next) => {
    res.status(200).json({
        message: 'Anime deleted :c'
    })
})

module.exports = router;