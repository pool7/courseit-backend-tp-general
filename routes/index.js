var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const multer = require('multer')
const multerConfig = multer({dest: 'uploads/'})

const MovieController = require('../controllers/MovieController')
const MovieService = require('../services/MovieService')
const MovieInstance = new MovieController(new MovieService())

const UserController = require('../controllers/UserController')
const UserService = require('../services/UserService')
const UserInstance = new UserController(new UserService())

passport.use(
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async(username, password, cb) => {
      const user = await new UserService().getUserByHandle(username)
      if (!user){
        return cb(null, false)
      }
      if(!bcrypt.compareSync(password, user.password)){
        return cb(null, false)
      }
      return cb(null, user)
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser(async(id, cb) => {
  const user = await new UserService().getUserById(id)
  cb(null, user)
})

router.use(require("morgan")("combined"));
router.use(require("body-parser").urlencoded({ extended: true }));

async function isAdmin(req, res, next) {
  const id = req.user
  if (!id){
    return res.sendStatus(401)
  }

  const user = await new UserService().getUserById(id)
  if (!user || !user.isAdmin){
    return res.sendStatus(401)
  }
  next()
}


router.get('/movies', (req, res, next) => {
  MovieInstance.getMovies(req, res)
})

router.get('/movies/:id', (req, res, next) => {
  MovieInstance.getMovieById(req, res)
})

router.post('/movies', isAdmin, multerConfig.single("image"), (req, res, next) => {
  MovieInstance.addMovies(req, res)
})

router.get('/users', (req, res, next) => {
  UserInstance.getUsers(req, res)
})

router.get('/users/:id', (req, res, next) => {
  UserInstance.getUserById(req, res)
})

// creado temporalmente para probar que funcione resolver por handle:
/* 
router.get('/user/:handle', (req,res,next) => {
  UserInstance.getUserByHandle(req,res)
})
*/

router.post('/users', (req, res, next) => {
  UserInstance.addUser(req, res)
})

router.post("/login", passport.authenticate("local"), function(req, res) {
  return res.json(req.user);
});

module.exports = router;