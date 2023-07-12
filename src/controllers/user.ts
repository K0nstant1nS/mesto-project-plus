import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { configureError } from '../utils';
import { castErrorMessage, userDataIncorrectMessage, userNotFoundMessage } from '../utils/constants';

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
      next(configureError(e, { notFound: userNotFoundMessage, cast: castErrorMessage }));
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
  req: Request,
  res: Response,
  next: NextFunction,
  validationErrorMessage: string,
  data: Partial<IUser>,
) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: data },
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

export const updateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const validationErrorMessage = 'Переданы некорректные данные при обновлении профиля.';
  const { name, about } = req.body;
  configurePatchUserRoute(req, res, next, validationErrorMessage, { name, about });
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const validationErrorMessage = 'Переданы некорректные данные при обновлении аватара.';
  const { avatar } = req.body;
  configurePatchUserRoute(req, res, next, validationErrorMessage, { avatar });
};
