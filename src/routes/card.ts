import { Router } from 'express';
import {
  getCards, postCard, deleteCard, putCardLike, deleteCardLike,
} from '../controllers/card';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', postCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', putCardLike);
cardRouter.delete('/:cardId/likes', deleteCardLike);

export default cardRouter;
