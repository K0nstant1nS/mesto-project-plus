import { celebrate, Joi, Segments } from 'celebrate';
import { avatarRegExp } from '../utils/constants';

// В документации используется Segments для обозначения поля для валидации,
// Глянул - это обычный enum с body,params и т.д.
// Возник вопрос, его используют только чтоб строки напрямую не передавать
// Или имеется некий более глубинный смысл? В сети ответа не нашёл.
export const getUserValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().length(24).required(),
  }),
});

export const postUserValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(avatarRegExp),
  }),
});

export const patchUserValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

export const patchAvatarValidator = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().pattern(avatarRegExp).required(),
  }),
});

export const loginValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export default {};
