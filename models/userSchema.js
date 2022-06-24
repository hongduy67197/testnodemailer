const mongoose = require('./dbConnect')

const usersSchema = mongoose.Schema(
    {
        email: String,
        password: String,
        wrongCount: Number,
        code: String,
        token: String,
        timeLock: Date,
    }, { collection: 'users' }
)

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel
