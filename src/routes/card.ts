import { Router } from 'express';
import {
  getCards, postCard, deleteCard, configureLikeRoute,
} from '../controllers/card';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', postCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', configureLikeRoute('$addToSet'));
cardRouter.delete('/:cardId/likes', configureLikeRoute('$pull'));

export default cardRouter;
