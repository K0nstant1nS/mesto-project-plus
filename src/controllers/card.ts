// Я так и не понял, нужно ли нам проверять id пользователя на данном этапе при работе с карточкой
// А потому пока просто убрал эту проверку. Если верно понял, то на данном этапе мы уже уверенны,
// что данные пользователя сверены с DB.
// А если всё же нужна такая проверка - можно её универсально вынести в отдельный middleware
// с единым текстом ошибки?
import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { configureError } from '../utils';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({}).populate('owner').then((cards) => {
    res.send(cards);
  }).catch((e: Error) => {
    next(configureError(e));
  });
};

export const postCard = (req: Request, res: Response, next: NextFunction) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((e: Error) => {
      next(configureError(e, { validation: 'Переданы некорректные данные при создании карточки.' }));
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => {
      if (!card) {
        const error = new Error();
        error.name = 'CastError';
        return Promise.reject(error);
      }
      return res.send(card);
    }).catch((e: Error) => {
      next(configureError(e, { notFound: 'Карточка с указанным _id не найдена.' }));
    });
};

export const configureLikeRoute = (
  method: '$pull' | '$addToSet',
) => (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { [method]: { likes: req.user._id } },
    { returnDocument: 'after' },
  ).orFail()
    .then((card) => res.send(card))
    .catch((e: Error) => {
      next(configureError(e, { notFound: 'Передан несуществующий _id карточки.' }));
    });
};
