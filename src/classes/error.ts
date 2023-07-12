import { DATA_ERROR, DEFAULT_ERROR, NOT_FOUND } from '../utils/constants';

export type TCustomError = Error & { statusCode: number };

export default class CustomError extends Error implements TCustomError {
  statusCode: number;

  constructor(message: string = 'Ошибка по умолчанию') {
    super(message);
    this.statusCode = DEFAULT_ERROR;
  }

  setNotFoundCode = () => {
    this.statusCode = NOT_FOUND;
    return this;
  };

  setValidationCode = () => {
    this.statusCode = DATA_ERROR;
    return this;
  };

  setCustomCode = (statusCode: number) => {
    this.statusCode = statusCode;
    return this;
  };
}
