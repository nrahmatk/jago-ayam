const express = require('express')
const router = express.Router()

// controller
const cuisineController = require('../controllers/cuisineController')

// middleware
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

// auth
router.use(authentication)
router.post('/', cuisineController.addCuisine)
router.get('/', cuisineController.getCuisine)
router.get('/count', cuisineController.getCount)
router.get('/:cuisineId', cuisineController.getCuisineById)

router.patch('/upload/:cuisineId', authorization, upload.single("imageUrl"), cuisineController.uploadImage)
router.put('/:cuisineId', authorization, cuisineController.editCuisine)
router.delete('/:cuisineId', authorization, cuisineController.deleteCuisine)

module.exports = router