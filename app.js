import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
import connectToDb from './database/db.js';
import staticRoutes from './routes/static.routes.js'
import uploadRoutes from './routes/movie.routes.js'

dotenv.config()

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', staticRoutes)
app.use('/movies', uploadRoutes)


const port = process.env.PORT || 8000;

connectToDb()

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
