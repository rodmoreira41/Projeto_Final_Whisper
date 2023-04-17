const express = require('express');
const router  = express.Router();
const auth = require('../middlewares/auth');
const passport = require('../middlewares/passport');

const MoviesController = require('../controllers/MoviesController');
const GenresController = require('../controllers/GenresController');
const DirectorsController = require('../controllers/DirectorsController');
const ActorsController = require('../controllers/ActorsController');
const MoviesByGenreController = require('../controllers/MoviesByGenreController');
const GenreByMoviesController = require('../controllers/GenreByMoviesController');
const AuthController = require('../controllers/AuthController');


// ---------- MoviesController ----------

router.get('/Movies/Count', MoviesController.countMovies);
router.get('/Movies', MoviesController.retrieveMovies);
router.post('/Movies', auth, MoviesController.createMovie);

router.get('/Movie/:id', MoviesController.retrieveMovie);
router.put('/Movie/:id', auth, MoviesController.updateMovie);
router.delete('/Movie/:id', auth, MoviesController.deleteMovie);

// ---------- GenresController ----------

router.get('/Genres/Count', GenresController.countGenres);
router.get('/Genres', GenresController.retrieveGenres);
router.post('/Genres', auth, GenresController.createGenre);

router.get('/Genre/:id', GenresController.retrieveGenre);
router.put('/Genre/:id', auth, GenresController.updateGenre);
router.delete('/Genre/:id', auth, GenresController.deleteGenre);

// ---------- DirectorsController ----------

router.get('/Directors/Count', DirectorsController.countDirectors);
router.get('/Directors', DirectorsController.retrieveDirectors);
router.post('/Directors', auth, DirectorsController.createDirector);

router.get('/Director/:id', DirectorsController.retrieveDirector);
router.put('/Director/:id', auth, DirectorsController.updateDirector);
router.delete('/Director/:id', auth, DirectorsController.deleteDirector);

// ---------- ActorsController ----------

router.get('/Actors/Count', ActorsController.countActors);
router.get('/Actors', ActorsController.retrieveActors);
router.post('/Actors', auth, ActorsController.createActor);

router.get('/Actor/:id', ActorsController.retrieveActor);
router.put('/Actor/:id', auth, ActorsController.updateActor);
router.delete('/Actor/:id', auth, ActorsController.deleteActor);

// ---------- MoviesByGenreController ----------

router.get('/Genre/:id/Movies', MoviesByGenreController.retrieveMoviesOnGenre);

// ---------- GenreByMoviesController ----------

router.get('/Movie/:id/Genres', GenreByMoviesController.retrieveGenreOnMovies);

// ---------- AuthController ----------

router.get('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/', auth, AuthController.protected);
router.get('/auth/github', passport.authenticate("github", { scope: ["user:email"] }), AuthController.authGitHub);
router.get('/auth/github/callback', passport.authenticate("github", { failureRedirect: "/login" }), AuthController.authCallback);
router.get('/me', auth, AuthController.me);
router.get('/githubme', auth, AuthController.gitHubMe);


module.exports = router;