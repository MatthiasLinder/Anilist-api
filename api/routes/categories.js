const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Categories were fetched'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Category was created'
    })
})

router.get('/:categoryId', (req, res, next) => {
    res.status(200).json({
        message: 'Category details.',
        categoryId: req.params.categoryId
    })
})

router.delete('/:categoryId', (req, res, next) => {
    res.status(200).json({
        message: 'Category deleted.',
        categoryId: req.params.categoryId
    })
})

module.exports = router;