import { Router } from 'express';
import {
  getMe,
  getUser, getUsers, updateUserAvatar, updateUserInfo,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/me', getMe);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);
userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);

export default userRouter;
