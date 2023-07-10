import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import CustomError from '../classes/error';
import { DATA_ERROR, NOT_FOUND } from '../utils/constants';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch(() => {
    next(new CustomError());
  });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      res.send(user);
    }).catch((e: Error) => {
      if (e.name.startsWith('CastError')) {
        next(new CustomError('Пользователь по указанному _id не найден.').setStatus(NOT_FOUND));
      } else {
        next(new CustomError());
      }
    });
};

export const postUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    }).catch((e: Error) => {
      if (e.name.startsWith('ValidationError')) {
        next(new CustomError('Переданы некорректные данные при создании пользователя.').setStatus(DATA_ERROR));
      } else {
        next(new CustomError());
      }
    });
};

export const patchUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name || !req.body.about) {
    return next(new CustomError('Переданы некорректные данные при обновлении профиля.').setStatus(DATA_ERROR));
  }
  return User.findByIdAndUpdate(
    req.user._id,
    { $set: { name: req.body.name, about: req.body.about } },
    { returnDocument: 'after', runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((e: Error) => {
      if (e.name.startsWith('CastError')) {
        next(new CustomError('Пользователь с указанным _id не найден.').setStatus(NOT_FOUND));
      } else if (e.name.startsWith('ValidationError')) {
        next(new CustomError('Переданы некорректные данные при обновлении профиля.').setStatus(DATA_ERROR));
      } else {
        next(new CustomError());
      }
    });
};

export const patchUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.avatar) {
    return next(new CustomError('Переданы некорректные данные при обновлении аватара.').setStatus(DATA_ERROR));
  }
  return User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: req.body.avatar } },
    { returnDocument: 'after', runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((e: Error) => {
      if (e.name.startsWith('CastError')) {
        next(new CustomError('Пользователь с указанным _id не найден').setStatus(NOT_FOUND));
      } else if (e.name.startsWith('ValidationError')) {
        next(new CustomError('Переданы некорректные данные при обновлении аватара.').setStatus(DATA_ERROR));
      } else {
        next(new CustomError());
      }
    });
};
