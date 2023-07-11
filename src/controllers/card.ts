import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import User from '../models/user';
import { configureError } from '../utils';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({}).populate('owner').then((cards) => {
    res.send(cards);
  }).catch((e: Error) => {
    next(configureError(e));
  });
};

export const postCard = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.user._id)
    .orFail()
    .catch(() => {
      const e = new mongoose.Error.ValidationError();
      next(configureError(e, { validation: 'Переданы некорректные данные при создании карточки.' }));
    })
    .then(() => Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    }))
    .then((card) => {
      res.send(card);
    })
    .catch((e: Error) => {
      next(configureError(e, { validation: 'Переданы некорректные данные при создании карточки.' }));
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId).then((card) => {
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

export const putCardLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  User.findById(req.user._id)
    .catch((e: Error) => {
      configureError(e, { notFound: 'Переданы некорректные данные для постановки лайка.' });
    })
    .then(() => Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { returnDocument: 'after' },
    ))
    .then((card) => res.send(card))
    .catch((e: Error) => {
      next(configureError(e, { notFound: 'Передан несуществующий _id карточки.' }));
    });
};

export const deleteCardLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  User.findById(req.user._id)
    .catch((e: Error) => {
      next(configureError(e, { notFound: 'Переданы некорректные данные для снятия лайка.' }));
    })
    .then(() => Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { returnDocument: 'after' },
    ))
    .then((card) => res.send(card))
    .catch((e: Error) => {
      next(configureError(e, { notFound: 'Передан несуществующий _id карточки.' }));
    });
};
