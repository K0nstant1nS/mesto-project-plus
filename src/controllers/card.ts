import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import CustomError from '../classes/error';
import { DATA_ERROR, NOT_FOUND } from '../utils/constants';
import User from '../models/user';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({}).populate('owner').then((cards) => {
    res.send(cards);
  }).catch(() => {
    next(new CustomError());
  });
};

export const postCard = (req: Request, res: Response, next: NextFunction) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
    likes: [],
  }).then((card) => {
    res.send(card);
  }).catch((e: Error) => {
    if (e.name.startsWith('ValidationError')) {
      next(new CustomError('Переданы некорректные данные при создании карточки.').setStatus(DATA_ERROR));
    } else {
      next(new CustomError());
    }
  });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId).then((card) => {
    res.send(card);
  }).catch((e: Error) => {
    if (e.name.startsWith('CastError')) {
      next(new CustomError('Карточка с указанным _id не найдена.').setStatus(NOT_FOUND));
    } else {
      next(new CustomError());
    }
  });
};

export const putCardLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  User.findById(req.user._id)
    .catch((e: Error) => {
      if (e.name.startsWith('CastError')) {
        next(new CustomError('Переданы некорректные данные для постановки лайка.').setStatus(NOT_FOUND));
      } else {
        next(new CustomError());
      }
    })
    .then(() => Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { returnDocument: 'after' },
    ))
    .then((card) => res.send(card))
    .catch((e: Error) => {
      if (e.name.startsWith('CastError')) {
        next(new CustomError('Передан несуществующий _id карточки.').setStatus(DATA_ERROR));
      } else {
        next(new CustomError());
      }
    });
};

export const deleteCardLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  User.findById(req.user._id)
    .catch((e: Error) => {
      if (e.name.startsWith('CastError')) {
        next(new CustomError('Переданы некорректные данные для снятия лайка.').setStatus(DATA_ERROR));
      } else {
        next(new CustomError());
      }
    })
    .then(() => Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { returnDocument: 'after' },
    ))
    .then((card) => res.send(card))
    .catch((e: Error) => {
      if (e.name.startsWith('CastError')) {
        next(new CustomError('Передан несуществующий _id карточки.').setStatus(DATA_ERROR));
      } else {
        next(new CustomError());
      }
    });
};
