import { Router } from 'express';
import userRouter from './user';
import cardRouter from './card';

const baseRouter = Router();

baseRouter.use('/users', userRouter);
baseRouter.use('/cards', cardRouter);

export default baseRouter;
