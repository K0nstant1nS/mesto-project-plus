import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { configureError } from '../utils';
import { FORBIDDEN_ERROR, cardNotFoundMessage, castErrorMessage } from '../utils/constants';

const configureLikeRoute = (req: Request, res: Response, next: NextFunction, method: '$pull' | '$addToSet') => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { [method]: { likes: req.user._id } },
    { returnDocument: 'after' },
  ).orFail()
    .then((card) => res.send(card))
    .catch((e: Error) => {
      next(configureError(e, { notFound: cardNotFoundMessage, cast: castErrorMessage }));
    });
};

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
          { notFound: cardNotFoundMessage, custom: { message: 'Ошибка при удалении карточки', code: FORBIDDEN_ERROR }, cast: castErrorMessage },
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
      res.send(card);
    }).catch((e: Error) => {
      next(configureError(e));
    });
};

export const addLike = (req: Request, res: Response, next: NextFunction) => {
  const method = '$addToSet';
  configureLikeRoute(req, res, next, method);
};

export const removeLike = (req: Request, res: Response, next: NextFunction) => {
  const method = '$pull';
  configureLikeRoute(req, res, next, method);
};
