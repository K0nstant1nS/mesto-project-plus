import { Router } from 'express';
import {
  getCards, postCard, deleteCard, addLike, removeLike, checkCardOwner,
} from '../controllers/card';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', postCard);
cardRouter.delete('/:cardId', checkCardOwner, deleteCard);
cardRouter.put('/:cardId/likes', addLike);
cardRouter.delete('/:cardId/likes', removeLike);

export default cardRouter;
