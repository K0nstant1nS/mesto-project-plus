import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { configureError } from '../utils';
import { cardNotFoundMessage, castErrorMessage } from '../utils/constants';
import CustomError from '../classes/error';

const configureLikeRoute = async (req: Request, res: Response, next: NextFunction, method: '$pull' | '$addToSet') => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { [method]: { likes: req.user._id } },
      { returnDocument: 'after' },
    ).orFail();
    res.send(card);
  } catch (e) {
    next(configureError(e as Error, { notFound: cardNotFoundMessage, cast: castErrorMessage }));
  }
};

export const checkCardOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).orFail();
    if (String(card.owner) !== req.user._id) {
      return next(CustomError.ForbiddentError('Нет прав на удаление этой карточки'));
    }
    next();
  } catch (e) {
    next(configureError(e as Error, { notFound: cardNotFoundMessage, cast: castErrorMessage }));
  }
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
