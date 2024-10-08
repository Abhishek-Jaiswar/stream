import { movies } from '../data/movies.js';
import { Movie } from '../models/movie.model.js';
import { uploadOnCloudinary } from '../services/cloudinary.js';

export const getHomePage = (req, res) => {
  res.render('index', {
    topMovies: movies.topMovies,
    latestMovies: movies.latestMovies,
    popularMovies: movies.popularMovies,
  });
};

export const movieDetail = (req, res) => {
  const movieId = req.params.id;

  const movie = movies.topMovies.find(m => m.id == movieId);

  if (movie) {
    res.render('movieDetail', { movie });
  } else {
    res.status(404).send('Movie not found');
  }
};


export const uploadMovies = async (req, res) => {
  try {

    const { title, director, releaseYear, genre, duration, description, ratings, cast } = req.body

    // console.log("Request Body:", req.body);
    // console.log("Uploaded Files:", req.files);

    const movieLocalPath = req.files.movie[0].path
    const thumbnailLocalPath = req.files.thumbnail[0].path

    const movies = await Movie.findOne({ title });
    if (movies) {
      return res.status(401).json({
        message: "movie already exists"
      })
    }
    const uplodMovieToCloud = await uploadOnCloudinary(movieLocalPath)
    const uplodThumbnailToCloud = await uploadOnCloudinary(thumbnailLocalPath)

    await Movie.create({
      title,
      director,
      releaseYear,
      genre,
      duration,
      description,
      ratings,
      cast,
      movie: uplodMovieToCloud.url,
      thumbnail: uplodThumbnailToCloud.url
    })

    return res.redirect('/')

  } catch (error) {
    console.log(error);
  }
};


export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (!movies.length) {
      return res.status(404).json({
        message: "No movies found",
      });
    }

    return res.render('all-movies', { movies });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    return res.render('movie-details', { movie: movie });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

