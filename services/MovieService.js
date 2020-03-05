const Movie = require('../models/Movie')

class MovieService {
    constructor() {
        this.limit = 5
    }

    getMovies(page) {
        const skip = (page - 1) * this.limit
        const query = Movie.find().skip(skip).limit(this.limit).exec()
        return query
    }

    getMovieById(id){
        const query = Movie.findOne({_id: id}).exec()
        return query
    }

    addMovie(data){
        const newMovie = new Movie(data)
        return newMovie.save()
    }

}

module.exports = MovieService