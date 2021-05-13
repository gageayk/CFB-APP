const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 1
    },
    lastName: {
        type: String,
        require: true,
        minlength: 1
    },
    email: {
        type: String,
        require: true,
        minlength: 1
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        require: true
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = { User }