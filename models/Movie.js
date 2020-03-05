const mongoose = require('mongoose')

const movieSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: Array,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Pelicula','Serie']
        }
    }
)

module.exports = mongoose.model('Movie', movieSchema)