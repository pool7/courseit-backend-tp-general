class MovieController {
    constructor(movieService){
        this.movieService = movieService
    }

    async getMovies(req, res) {
        let page = req.query.page ? req.query.page : 1
        if (!req.user) {
            return res.sendStatus(401)
        }
        const movies = await this.movieService.getMovies(page)
        return res.json(movies)
    }

    async getMovieById(req, res) {
        if (!req.user) {
            return res.sendStatus(401)
        }
        const id = req.params.id
        if(id.length != 24) {
            return res.send("Invalid ID length")
        }
        const movie = await this.movieService.getMovieById(id)
        if(!movie){
            return res.send("Movie does not exist")
        } else {
            return res.json(movie)
        }
    }

    async addMovies(req, res){
        if (!req.user) {
            return res.sendStatus(401)
        }        
        const body = req.body
        const newBody = {
            ...body, image: req.file.filename
           }
        const movie = await this.movieService.addMovie(newBody)
        return res.sendStatus(200)
    }
}

module.exports = MovieController