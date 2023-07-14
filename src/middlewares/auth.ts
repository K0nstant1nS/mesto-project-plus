import { NextFunction, Request, Response } from 'express';
import jws, { JsonWebTokenError } from 'jsonwebtoken';
import { configureError } from '../utils';
import CustomError from '../classes/error';
import { noTokenMessage, secretKey, tokenCheckErrorMessage } from '../utils/constants';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(CustomError.UnauthorizedError(noTokenMessage));
    }
    const data = jws.verify(token, secretKey) as { _id: string };
    req.user = { _id: data._id };
    next();
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      next(CustomError.UnauthorizedError(tokenCheckErrorMessage));
    } else {
      next(configureError(e as Error));
    }
  }
};

export default auth;
