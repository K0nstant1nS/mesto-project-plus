import { celebrate, Joi, Segments } from 'celebrate';

export const deleteCardValidator = celebrate({
  [Segments.PARAMS]: Joi.object({

  }),
});

export default {};
