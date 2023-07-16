import mongoose from 'mongoose';
import CustomError from '../classes/error';

interface IMessages {
  notFound?: string,
  validation?: string,
  cast?: string,
  custom?: {
    message: string,
    code: number,
  }
}

const defaultMessages = {
  notFound: 'Документ не найден',
  validation: 'Ошибка валидации',
  cast: 'Неверный фармат id',
};

export const configureError = (e: Error, messages: IMessages = {}) => {
  messages = { ...defaultMessages, ...messages }; // eslint-disable-line no-param-reassign
  if (messages.notFound && e instanceof mongoose.Error.DocumentNotFoundError) {
    return CustomError.NotFoundError(messages.notFound);
  }
  if (messages.validation && e instanceof mongoose.Error.ValidationError) {
    return CustomError.ValidationError(messages.validation);
  }
  if (messages.cast && e instanceof mongoose.Error.CastError) {
    return CustomError.ValidationError(messages.cast);
  }
  if (messages.custom) {
    return new CustomError(messages.custom.message, messages.custom.code);
  }
  return new CustomError();
};

export default {};
