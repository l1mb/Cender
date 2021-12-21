const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const userControllers = require('../controllers/users')

const router = express.Router()

router.get('/', userControllers.getAllUsers)
router.post('/sign-up', userControllers.userRegister)
router.post('/login', userControllers.userLogin)

module.exports = router
