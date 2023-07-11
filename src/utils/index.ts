import mongoose from 'mongoose';
import CustomError from '../classes/error';
import { DATA_ERROR, NOT_FOUND } from './constants';

interface IMessages {
  notFound?: string,
  validation?: string,
  custom?: {
    message: string,
    code: number,
  }
}

export const configureError = (e: Error, messages?: IMessages) => {
  if (
    messages
    && (e instanceof mongoose.Error.DocumentNotFoundError || e instanceof mongoose.Error.CastError)
  ) {
    return new CustomError(messages.notFound).setStatus(NOT_FOUND);
  }
  if (messages && e instanceof mongoose.Error.ValidationError) {
    return new CustomError(messages.validation).setStatus(DATA_ERROR);
  }
  if (messages && messages.custom) {
    return new CustomError(messages.custom.message).setStatus(messages.custom.code);
  }
  return new CustomError();
};

export default {};
