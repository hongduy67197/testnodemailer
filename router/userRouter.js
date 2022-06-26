const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const { checkToken } = require('../midderware/auth')

router.get('/CheckMail/:email/:code', userController.verifyEmail)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', checkToken, userController.logOut)

module.exports = router