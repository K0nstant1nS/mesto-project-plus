import {
  AUTH_ERROR, CONFLICT_ERROR, DATA_ERROR, DEFAULT_ERROR, FORBIDDEN_ERROR, NOT_FOUND_ERROR,
} from '../utils/constants';

export type TCustomError = Error & { statusCode: number };

export default class CustomError extends Error implements TCustomError {
  statusCode: number;

  constructor(message: string = 'Ошибка по умолчанию', statusCode: number = DEFAULT_ERROR) {
    super(message);
    this.statusCode = statusCode;
  }

  static NotFoundError(message: string) {
    return new CustomError(message, NOT_FOUND_ERROR);
  }

  static ValidationError(message: string) {
    return new CustomError(message, DATA_ERROR);
  }

  static UnauthorizedError(message: string) {
    return new CustomError(message, AUTH_ERROR);
  }

  static ConflictError(message: string) {
    return new CustomError(message, CONFLICT_ERROR);
  }

  static ForbiddentError(message: string) {
    return new CustomError(message, FORBIDDEN_ERROR);
  }
}
