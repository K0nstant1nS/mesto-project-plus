import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { configureError } from '../utils';
import { userDataIncorrectMessage, userNotFoundMessage } from '../utils/constants';

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
      next(configureError(e, { notFound: userNotFoundMessage }));
    });
};

export const postUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    }).catch((e: Error) => {
      next(configureError(e, { validation: userDataIncorrectMessage }));
    });
};

const configurePatchUserRoute = (
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
      next(
        configureError(e, { notFound: userNotFoundMessage, validation: validationErrorMessage }),
      );
    });
};

export const updateUserInfo = configurePatchUserRoute('Переданы некорректные данные при обновлении профиля.');

export const updateUserAvatar = configurePatchUserRoute('Переданы некорректные данные при обновлении аватара.');
