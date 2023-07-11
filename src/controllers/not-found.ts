import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { configureError } from '../utils';

export const errorRouter = (req: Request, res: Response, next: NextFunction) => {
  const error = new mongoose.Error.DocumentNotFoundError('');
  next(configureError(error, { notFound: 'Страница не найдена' }));
};

export default {};
