import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import baseRouter from './routes/index';
import { TCustomError } from './classes/error';

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '64abf29b6f7ae2499ecaba1d',
  };
  next();
});
app.use('/', baseRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* eslint-disable */
app.use((err: TCustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({ message });
});
/* eslint-enable */

app.listen(3000);
