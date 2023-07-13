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

// Я понимаю причину возникновения ошибки, но не понимаю для чего её отдельно от
// DocumentNotFoundError отлавливать. У нас в задании нет отдельного прописанного сценария для
// CastError. Потому я и объединил её с DocumentNotFoundError.
// Если я снова что-то сделал не так, то уже совершенно не понимаю что требует правки.
export const configureError = (e: Error, messages?: IMessages) => {
  if (messages && e instanceof mongoose.Error.DocumentNotFoundError) {
    return new CustomError(messages.notFound).setNotFoundCode();
  }
  if (messages && e instanceof mongoose.Error.ValidationError) {
    return new CustomError(messages.validation).setValidationCode();
  }
  if (messages && e instanceof mongoose.Error.CastError) {
    return new CustomError(messages.cast).setValidationCode();
  }
  if (messages && messages.custom) {
    return new CustomError(messages.custom.message).setCustomCode(messages.custom.code);
  }
  return new CustomError();
};

export const getCookie = (cookie: string, name: string): string | undefined => {
  const matches = cookie.match(
    // eslint-disable-next-line
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export default {};
