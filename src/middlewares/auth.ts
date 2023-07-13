import { NextFunction, Request, Response } from 'express';
import jws from 'jsonwebtoken';
import { getCookie } from '../utils';
import CustomError from '../classes/error';
import { noTokenMessage, secretKey, tokenCheckErrorMessage } from '../utils/constants';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.cookie) {
      throw new CustomError(noTokenMessage).setUnauthorizedCode();
    }
    const token = getCookie(req.headers.cookie, 'token');
    if (!token) {
      throw new CustomError(noTokenMessage).setUnauthorizedCode();
    }
    const data = jws.verify(token, secretKey);
    if (typeof data !== 'string' && data._id) {
      req.user = { _id: data._id };
    } else {
      throw new CustomError(tokenCheckErrorMessage).setUnauthorizedCode();
    }
    next();
  } catch (e) {
    if (e instanceof CustomError) {
      next(e as Error);
    } else {
      next(new CustomError(tokenCheckErrorMessage).setUnauthorizedCode());
    }
  }
};

export default auth;
