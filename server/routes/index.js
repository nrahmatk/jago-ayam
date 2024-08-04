const express = require('express')
const router = express.Router()
const cuisineRoutes = require('./cuisines')
const categoryRoutes = require('./categories')
const publicRoutes = require('./pub')
const authRoutes = require('./auth')


// auth
router.use('/', authRoutes)

// cuisines 
router.use('/cuisines', cuisineRoutes)
 
// categories 
router.use('/categories', categoryRoutes)

// public
router.use('/pub', publicRoutes)



module.exports = router