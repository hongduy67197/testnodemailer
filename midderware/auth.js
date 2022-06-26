const userModel = require('../models/userSchema')
const jwt = require('jsonwebtoken')

async function checkToken(req, res, next) {
    let searchTokenUser
    try {
        let token = req.headers.authorization
        searchTokenUser = await userModel.findOne(
            { token: token }
        )
        if (searchTokenUser) {
            let id = jwt.verify(token, 'projectFEB1')
            if (id) {
                delete searchTokenUser._doc.token
                delete searchTokenUser._doc.password
                req.user = searchTokenUser
                next()
            }
        } else {
            res.json('cant not find user')

        }
    } catch (error) {
        if (error.message == 'jwt expired') {
            res.json({ message: 'jwt expired' })
        } else {
            res.json(error)
        }
    }
}

module.exports = { checkToken }