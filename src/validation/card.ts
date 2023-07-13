import { celebrate, Joi, Segments } from 'celebrate';
import { linkRegExp } from '../utils/constants';

export const getCardValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const postCardValidatot = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(linkRegExp).required(),
  }),
});

export default {};
