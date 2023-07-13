import {
  AUTH_ERROR, CONFLICT_ERROR, DATA_ERROR, DEFAULT_ERROR, NOT_FOUND_ERROR,
} from '../utils/constants';

export type TCustomError = Error & { statusCode: number };

export default class CustomError extends Error implements TCustomError {
  statusCode: number;

  constructor(message: string = 'Ошибка по умолчанию') {
    super(message);
    this.statusCode = DEFAULT_ERROR;
  }

  setNotFoundCode = () => {
    this.statusCode = NOT_FOUND_ERROR;
    return this;
  };

  setValidationCode = () => {
    this.statusCode = DATA_ERROR;
    return this;
  };

  setUnauthorizedCode = () => {
    this.statusCode = AUTH_ERROR;
    return this;
  };

  setCustomCode = (statusCode: number) => {
    this.statusCode = statusCode;
    return this;
  };

  setConflictCode = () => {
    this.statusCode = CONFLICT_ERROR;
    return this;
  };
}
