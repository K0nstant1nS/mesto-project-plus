import { NextFunction, Request, Response } from 'express';
import CustomError from '../classes/error';

export const errorRouter = (req: Request, res: Response, next: NextFunction) => {
  next(CustomError.NotFoundError('Страница не найдена'));
};

export default {};
