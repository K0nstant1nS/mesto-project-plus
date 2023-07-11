import mongoose from 'mongoose';
import CustomError from '../classes/error';
import { DATA_ERROR, NOT_FOUND } from './constants';

interface IMessages {
  notFound?: string,
  validation?: string
}

export const configureError = (e: Error, messages?: IMessages) => {
  if (messages && e instanceof mongoose.Error.DocumentNotFoundError) {
    return new CustomError(messages.notFound).setStatus(NOT_FOUND);
  }
  if (messages && e instanceof mongoose.Error.ValidationError) {
    return new CustomError(messages.validation).setStatus(DATA_ERROR);
  }
  return new CustomError();
};

export default {};
