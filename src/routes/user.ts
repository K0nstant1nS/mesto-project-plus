import { Router } from 'express';
import {
  getUser, getUsers, patchUser, patchUserAvatar, postUser,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', postUser);
userRouter.patch('/me', patchUser);
userRouter.patch('/me/avatar', patchUserAvatar);

export default userRouter;
