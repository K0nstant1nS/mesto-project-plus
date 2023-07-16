import { celebrate, Joi, Segments } from 'celebrate';
import { linkRegExp } from '../utils/constants';

export const getUserValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
});

export const postUserValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(linkRegExp),
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
    avatar: Joi.string().pattern(linkRegExp).required(),
  }),
});

export const loginValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export default {};
