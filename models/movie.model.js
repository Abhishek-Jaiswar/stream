import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    description: String,
    ratings: [{
        type: Number,
        min: 1, max: 5
    }],
    cast: [String],
    movie: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
});

export const Movie = mongoose.model('Movie', movieSchema);