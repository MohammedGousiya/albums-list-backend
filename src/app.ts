import express from 'express';
import bodyParser from 'body-parser';
import albumsRouter from './routes/albums.routes';
import { errorHandler } from './utils/errors';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/albums', albumsRouter);

app.use(errorHandler);

export default app;