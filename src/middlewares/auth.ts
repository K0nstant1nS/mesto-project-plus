import { NextFunction, Request, Response } from 'express';
import jws from 'jsonwebtoken';
import { getCookie } from '../utils';
import CustomError from '../classes/error';
import { secretKey } from '../utils/constants';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.cookie) {
      throw new CustomError('Не удаётся получить токен').setUnauthorizedCode();
    }
    const token = getCookie(req.headers.cookie, 'token');
    if (!token) {
      throw new CustomError('Не удаётся получить токен').setUnauthorizedCode();
    }
    const data = jws.verify(token, secretKey);
    if (typeof data !== 'string') {
      req.user = { _id: data._id };
    } else {
      throw new CustomError('Ошибка при проверке токена').setUnauthorizedCode();
    }
    next();
  } catch (e) {
    if (e instanceof CustomError) {
      next(e as Error);
    } else {
      next(new CustomError('Ошибка при проверке токена').setUnauthorizedCode());
    }
  }
};

export default auth;
