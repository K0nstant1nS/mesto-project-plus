export const DATA_ERROR = 400;
export const AUTH_ERROR = 401;
export const NOT_FOUND_ERROR = 404;
export const CONFLICT_ERROR = 409;

export const DEFAULT_ERROR = 500;

export const userNotFoundMessage = 'Пользователь по указанному _id не найден.';
export const userDataIncorrectMessage = 'Переданы некорректные данные при создании пользователя.';
export const authorizationErrorMessage = 'Ошибка при попытке авторизации';
export const castErrorMessage = 'Передан невалидный id';
export const cardNotFoundMessage = 'Карточка с указанным _id не найдена.';

export const secretKey = 'secret key';

// eslint-disable-next-line
export const avatarRegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
