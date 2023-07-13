import express from 'express';
import mongoose from 'mongoose';
import baseRouter from './routes/index';
import { login, postUser } from './controllers/user';
import auth from './middlewares/auth';
import error from './middlewares/error';

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/signin', login);
app.post('/signup', postUser);

app.use(auth);

app.use('/', baseRouter);

app.use(error);

app.listen(3000);
