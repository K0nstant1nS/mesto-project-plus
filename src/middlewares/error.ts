import { NextFunction, Request, Response } from 'express';
import { TCustomError } from '../classes/error';

// eslint-disable-next-line no-unused-vars
const error = (err: TCustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({ message });
};

export default error;
