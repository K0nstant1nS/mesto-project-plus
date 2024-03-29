import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jws from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { configureError } from '../utils';
import {
  castErrorMessage, secretKey, userDataIncorrectMessage, userNotFoundMessage,
} from '../utils/constants';
import CustomError from '../classes/error';

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

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch((e) => {
    next(configureError(e));
  });
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).orFail();
    res.send(user);
  } catch (e) {
    next(configureError(e as Error, { notFound: userNotFoundMessage, cast: castErrorMessage }));
  }
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

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.send(user);
  } catch (e: any) {
    if (e.code === 11000) {
      next(CustomError.ConflictError('Пользователь с таким email уже существует'));
    } else {
      next(configureError(e, { validation: userDataIncorrectMessage }));
    }
  }
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).orFail();
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(CustomError.UnauthorizedError('Неправильный логин или пароль'));
    }
    const token = jws.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true });
    res.send({ message: 'успешный логин' });
  } catch (e) {
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(CustomError.UnauthorizedError('Неправильный логин или пароль'));
    } else {
      next(configureError(e as Error));
    }
  }
};
