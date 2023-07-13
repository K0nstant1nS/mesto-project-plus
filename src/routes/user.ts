import { Router } from 'express';
import {
  getMe,
  getUser, getUsers, updateUserAvatar, updateUserInfo,
} from '../controllers/user';
import { getUserValidator, patchAvatarValidator, patchUserValidator } from '../validation/user';

const userRouter = Router();

userRouter.get('/me', getMe);
userRouter.patch('/me', patchUserValidator, updateUserInfo);
userRouter.patch('/me/avatar', patchAvatarValidator, updateUserAvatar);
userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserValidator, getUser);

export default userRouter;
