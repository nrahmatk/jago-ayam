const express = require('express')
const categoryController = require('../controllers/categoryController')
const authorAdmin = require('../middlewares/authorAdmin')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.get('/', categoryController.getCategory)

router.use(authentication, authorAdmin)
router.post('/', categoryController.addCategory)
router.get('/:categoryId', categoryController.getCategoryById)
router.put('/:categoryId', categoryController.editCategory)
router.delete('/:categoryId', categoryController.deleteCategory)

module.exports = router