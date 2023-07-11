import { Router } from 'express';
import {
  configurePatchUserRoute,
  getUser, getUsers, postUser,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', postUser);
userRouter.patch('/me', configurePatchUserRoute('Переданы некорректные данные при обновлении профиля.'));
userRouter.patch('/me/avatar', configurePatchUserRoute('Переданы некорректные данные при обновлении аватара.'));

export default userRouter;
