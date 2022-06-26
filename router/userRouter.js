const express = require('express')
const router = express.Router()
const path = require('path')
const userController = require('../controller/userController.js')
const { checkToken } = require('../midderware/auth')

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../views/home/home.html')) 
})
router.get('/CheckMail/:email/:code', userController.verifyEmail)
router.post('/register', userController.register)
router.get('/register', (req,res) => { 
    res.sendFile(path.join(__dirname, '../views/register/register.html'))
})
router.post('/login', userController.login)
router.get('/login', (req,res)=> {
    res.sendFile(path.join(__dirname, '../views/login/login.html'))
})
router.post('/logout/:id', checkToken, userController.logOut)

module.exports = router