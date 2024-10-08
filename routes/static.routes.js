import express from 'express';
import { getAllMovies, getHomePage, getMovieById } from '../controllers/movieControllers.js';

const router = express.Router();

router.get('/', getHomePage);
router.get('/all-movies', getAllMovies)
router.get('/upload-movie-form', (_, res) => {
    res.render('upload-form')
})

router.get('/movie/:id', getMovieById)

export default router;