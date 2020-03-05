const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }
)

module.exports = mongoose.model('User', userSchema)