import { Router } from 'express';
import { errorRouter } from '../controllers/not-found';
import userRouter from './user';
import cardRouter from './card';

const baseRouter = Router();

baseRouter.use('/users', userRouter);
baseRouter.use('/cards', cardRouter);
baseRouter.use('/', errorRouter);

export default baseRouter;
