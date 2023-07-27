import mongoose, { Model } from 'mongoose';
import {
  Injectable, UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response, Request, RequestParamHandler } from 'express';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { secretKey } from '../utils/constants';
import { User } from './user.schema';
import catchError from '../utils/error-catcher';
import { PostUserDto } from './dto/create-user.dto';
import { PatchAvatarDto } from './dto/patch-avatar.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Injectable()

export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  private async configurePatchUserRoute(req: Request, body: PatchAvatarDto|PatchUserDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(req.user._id, { $set: body }, { returnDocument: 'after', runValidators: true }).orFail();
      return user;
    } catch (e) {
      catchError(e);
    }
  }

  async getAll() {
    try {
      return this.userModel.find({}).orFail().exec();
    } catch (e) {
      catchError(e);
    }
  }

  async getMe(req: Request) {
    try {
      const user = await this.userModel.findById(req.user._id).orFail();
      return user;
    } catch (e) {
      catchError(e);
    }
  }

  async getUser(req: Request) {
    const { userId } = req.params;
    try {
      const user = this.userModel.findById(userId).orFail();
      return user;
    } catch (e) {
      catchError(e);
    }
  }

  async setUser(body: PostUserDto) {
    try {
      const password = await hash(body.password, 10);
      const user = await this.userModel.create({ ...body, password });
      return user;
    } catch (e) {
      catchError(e);
    }
  }

  async patchInfo(req: Request, body: PatchAvatarDto|PatchUserDto) {
    return this.configurePatchUserRoute(req, body);
  }

  async login(body: LoginUserDto, response: Response) {
    try {
      const { email, password } = body;
      const user = await this.userModel.findOne({ email }).orFail();
      const isMatched = compare(user.password, password);
      if (!isMatched) {
        throw new UnauthorizedException('Непарвильный email или пароль');
      }
      const token = sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
      response.cookie('token', token, { httpOnly: true });
      response.send('All ok!');
    } catch (e) {
      catchError(e);
    }
  }
}

export default {};
