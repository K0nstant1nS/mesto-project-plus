import { NextFunction, Request, Response } from 'express';
import { isCelebrateError } from 'celebrate';
import { DATA_ERROR } from '../utils/constants';

// Обработчик ошибок от celebrate, дабы придерживаться общей структуры объекта ошибки
// eslint-disable-next-line no-unused-vars
const joiError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (isCelebrateError(err)) {
    res.status(DATA_ERROR).send({ message: 'Переданы невалидные данные' });
  } else {
    next(err);
  }
};

export default joiError;
