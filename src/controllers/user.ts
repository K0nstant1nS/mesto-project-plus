import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { configureError } from '../utils';

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

// Я верно понял идею с выносом общей логики?
// В задании у нас сказано отправлять "400 — Переданы некорректные данные при обновлении аватара"
// И для этого я проверял, что поле avatar имеется в body request(a)
export const configurePatchUserRoute = (
  validationErrorMessage: string,
) => (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { ...req.body } },
    { returnDocument: 'after', runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((e: Error) => {
      next(configureError(e, { notFound: 'Пользователь с указанным _id не найден.', validation: validationErrorMessage }));
    });
};
