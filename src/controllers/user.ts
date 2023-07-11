import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { configureError } from '../utils';

interface IPatchUserSettings {
  options: {
    $set: {
      name?: string,
      about?: string,
      avatar?: string,
    }
  },
  validationErrorMessage: string
}

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch((e) => {
    next(configureError(e));
  });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    }).catch((e: Error) => {
      next(configureError(e, { notFound: 'Пользователь по указанному _id не найден.' }));
    });
};

export const postUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    }).catch((e: Error) => {
      next(configureError(e, { validation: 'Переданы некорректные данные при создании пользователя.' }));
    });
};

export const patchUser = (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name: req.body.name, about: req.body.about } },
    { returnDocument: 'after', runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((e: Error) => {
      next(configureError(e, { notFound: 'Пользователь с указанным _id не найден.', validation: 'Переданы некорректные данные при обновлении профиля.' }));
    });
};

export const patchUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: req.body.avatar } },
    { returnDocument: 'after', runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((e: Error) => {
      next(configureError(e, { notFound: 'Пользователь с указанным _id не найден.', validation: 'Переданы некорректные данные при обновлении аватара.' }));
    });
};

export const patchUserFull = (req: Request, res: Response, next: NextFunction) => {
  const controller = {
    user: {
      options: { $set: { name: req.body.name, about: req.body.about } },
      validationErrorMessage: 'Переданы некорректные данные при обновлении профиля.',
    },
    avtar: {
      options: { $set: { avatar: req.body.avatar } },
      validationErrorMessage: 'Переданы некорректные данные при обновлении аватара.',
    },
  };

};
