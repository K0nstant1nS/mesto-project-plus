import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { secretKey } from '../utils/constants';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  // eslint-disable-next-line class-methods-use-this
  use(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;
    console.log(token);
    try {
      const data = verify(token, secretKey) as {_id: string};
      req.user = { _id: data._id };
      next();
    } catch (e) {
      console.log('Ошибочка');
    }
  }
}
