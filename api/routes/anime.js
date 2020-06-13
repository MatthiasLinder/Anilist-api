const express = require('express')
const router = express.Router()

const multer = require('multer')
const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else{
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

const AnimeController = require('../controllers/anime')

router.get('/', AnimeController.anime_get_all),
router.get('/:animeId', AnimeController.anime_get_with_id),

router.post('/', checkAuth, upload.single('animeImage'), AnimeController.anime_create),
router.patch('/:animeId', checkAuth, AnimeController.anime_update),
router.delete('/:animeId', checkAuth, AnimeController.anime_delete),

module.exports = router;