import { celebrate, Joi, Segments } from 'celebrate';
import { linkRegExp } from '../utils/constants';

export const getCardValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

// Вроде в задании нет ничего про валидацию поля link, но я решил, что логично
// добавить её, раз уж avatar валидируем.
export const postCardValidatot = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(linkRegExp).required(),
  }),
});

export default {};
