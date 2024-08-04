const express = require('express')
const router = express.Router()

// controller
const cuisineController = require('../controllers/cuisineController')

// public
router.get('/cuisines', cuisineController.getCuisinePub)
router.get('/cuisines/:cuisineId', cuisineController.getCuisinePubById)

module.exports = router
