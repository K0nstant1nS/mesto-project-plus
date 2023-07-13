import { Router } from 'express';
import {
  getCards, postCard, deleteCard, addLike, removeLike, checkCardOwner,
} from '../controllers/card';
import { getCardValidator, postCardValidatot } from '../validation/card';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', postCardValidatot, postCard);
cardRouter.delete('/:cardId', getCardValidator, checkCardOwner, deleteCard);
cardRouter.put('/:cardId/likes', getCardValidator, addLike);
cardRouter.delete('/:cardId/likes', getCardValidator, removeLike);

export default cardRouter;
