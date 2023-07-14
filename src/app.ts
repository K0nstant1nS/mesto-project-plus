import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import baseRouter from './routes/index';
import { login, postUser } from './controllers/user';
import auth from './middlewares/auth';
import error from './middlewares/error';
import { loginValidator, postUserValidator } from './validation/user';
import joiError from './middlewares/joi-error';
import { errorLogger, requestLogger } from './middlewares/logger';

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(requestLogger);
app.post('/signin', loginValidator, login);
app.post('/signup', postUserValidator, postUser);

app.use(auth);

app.use('/', baseRouter);

app.use(errorLogger);
app.use(joiError);
app.use(error);

app.listen(3000);
