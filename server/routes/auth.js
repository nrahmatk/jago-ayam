const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authentication = require('../middlewares/authentication')
const authorAdmin = require('../middlewares/authorAdmin')

// login
router.post('/login', authController.login)

// register - admin only
router.post('/add-user', authentication, authorAdmin, authController.addUser)

module.exports = router

