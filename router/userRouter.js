const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')


router.get('/CheckMail/:email/:code', userController.verifyEmail)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logOut)

module.exports = router