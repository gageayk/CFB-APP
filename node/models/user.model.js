const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        minlength: 1
    },
    name: {
        type: String,
        require: true,
        minlength: 1
    },
    favTeams: [String],
    _userId: {
        type: mongoose.Types.ObjectId,
        require: true
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = { User }