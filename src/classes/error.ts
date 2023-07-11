import { DEFAULT_ERROR } from '../utils/constants';

/* eslint-disable */export type TCustomError = Error & { statusCode: number, setStatus: (code: number) => TCustomError };
/* eslint-enable */
export default class CustomError extends Error implements TCustomError {
  statusCode: number;

  constructor(message: string = 'Ошибка по умолчанию') {
    super(message);
    this.statusCode = DEFAULT_ERROR;
  }

  setStatus = (code: number) => {
    this.statusCode = code;
    return this;
  };
}
