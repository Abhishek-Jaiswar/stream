
import express from 'express';
import { uploadMovies } from '../controllers/movieControllers.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/upload', upload.fields([
    { name: 'movie', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), uploadMovies);


export default router;
