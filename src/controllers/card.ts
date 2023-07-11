import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { configureError } from '../utils';
import { DATA_ERROR } from '../utils/constants';

const configureLikeRoute = (
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

// Меня понесло и я понаписал ненужного функционала, почти все удалил
// А тут проверка на владельца карточки при удалении(вместе с ненайденной). Оставлю пока?
export const checkCardOwner = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (String(card.owner) === req.user._id) {
        return next();
      }
      throw new Error();
    })
    .catch((e) => {
      next(
        configureError(
          e,
          { notFound: 'Карточка с указанным _id не найдена.', custom: { message: 'Ошибка при удалении карточки', code: DATA_ERROR } },
        ),
      );
    });
};

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

export const addLike = configureLikeRoute('$addToSet');

export const removeLike = configureLikeRoute('$pull');
